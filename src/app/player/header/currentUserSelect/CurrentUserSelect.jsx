import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../../CurrentUserContext";
import { mdiMenuDown, mdiAccountCircle } from "@mdi/js";
import Icon from "../../../../common/components/Icon";
import UserMenu from "./userMenu/UserMenu";
import styles from "./currentUserSelect.module.css";

export default function CurrentUserSelect() {
  const { user, disconnect } = useContext(CurrentUserContext);
  const [element, setElement] = useState(null);
  const [open, setOpen] = useState(false);
  const image = user.images[0].url;

  return (
    <div
      ref={setElement}
      className={styles.select}
      onClick={() => setOpen((prev) => !prev)}
    >
      {image ? (
        <img className={styles.image} src={image} alt="" />
      ) : (
        <Icon className={styles.accountIcon} path={mdiAccountCircle} />
      )}

      <div className={styles.name}>{user.display_name}</div>
      <Icon className={styles.arrowIcon} path={mdiMenuDown} />
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
