import { useRef, useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { firebaseContext } from "../../Firebase/firebase";
import { runTransaction, getDoc } from "firebase/firestore";

export default function UserUI() {
  const [displayImg, setDisplayImg] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [update, setUpdate] = useState(false);
  const inputRef = useRef(null);
  const img = useRef(null);

  const { signout, setUserConnect, user, 
        uid, setUid, db, setIsLoading } =
    useContext(firebaseContext);
  let timeout;

  const handleProfile = () => {
    if (inputRef.current.files && inputRef.current.files[0]) {
      setDisplayImg(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          runTransaction(db, async (transaction) => {
            const actualData = await transaction.get(user(uid));

            if (!actualData.exists()) {
              throw "Element non trouvé";
            }
            transaction.update(user(uid), {
              fullname: actualData.data().fullname,
              email: actualData.data().email,
              password: actualData.data().password,
              image: e.target.result,
            });
            setUpdate(!update);
          });
        } catch (e) {
          alert("Transaction Echoue");
        }
      };
      reader.readAsDataURL(inputRef.current.files[0]);
    }
  };

  const disconnected = () => {
    setIsLoading(true);
    signout()
      .then(() => {
        timeout = setTimeout(() => {
          setUserConnect(false);
          setShowMenu(!showMenu);
          setUid(null)
          setIsLoading(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (update) {
      getDoc(user(uid))
        .then((doc) => {
          if (doc.exists()) {
            if (doc.data().image) {
              setDisplayImg(true);
              setTimeout(() => {
                img.current.src = doc.data().image;
              }, 200);
            }
          }
        })
        .catch((err) => {
          console.error("Erreur: ", err);
        });
    } else {
      setUpdate(true);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [update, timeout, uid, user]);

  return (
    <div className="userui">
      <div className="user-icon" onClick={() => setShowMenu(!showMenu)}>
        {!displayImg ? (
          <FontAwesomeIcon icon={faUser} />
        ) : (
          <img alt="" ref={img} />
        )}
      </div>
      <div className={showMenu ? "user-menu" : "user-menu active"}>
        <ul>
          <li onClick={() => setShowMenu(!showMenu)}>
            <div className="upload-content">
              <span>Editer profile</span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                ref={inputRef}
                onChange={handleProfile}
              />
            </div>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>Changer mot de passe</li>
          <li onClick={() => setShowMenu(!showMenu)}>Paramètres</li>
          <li onClick={disconnected}>Deconnection</li>
        </ul>
      </div>
    </div>
  );
}
