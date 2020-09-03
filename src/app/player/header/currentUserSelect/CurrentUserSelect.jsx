import React, { useContext, useState } from "react";
import classNames from 'classnames';
import { CurrentUserContext } from "../../../CurrentUserContext";
import { mdiMenuDown, mdiAccountCircle } from "@mdi/js";
import Icon from "../../../../common/components/Icon";
import UserMenu from "./userMenu/UserMenu";
import styles from "./currentUserSelect.module.css";

export default function CurrentUserSelect() {
  const { user, disconnect } = useContext(CurrentUserContext);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);


  let imageURL;
  if (user.images.length) {
    imageURL = user.images[0].url;
  }


  const arrowClassname = classNames(styles.arrowIcon, open && styles.open);
  return (
    <div
      ref={setElement}
      className={styles.select}
      onClick={() => setOpen((prev) => !prev)}
    >
      {imageURL ? (
        <img className={styles.image} src={imageURL} alt="" />
      ) : (
        <Icon className={styles.accountIcon} path={mdiAccountCircle} />
      )}

      <div className={styles.name}>{user.display_name}</div>
      <Icon className={arrowClassname} path={mdiMenuDown} />
      <UserMenu
        open={open}
        user={user}
        referenceElement={element}
        onClose={() => setOpen(false)}
        disconnect={disconnect}
      />
    </div>
  );
}
