import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faHamburger,
  faHome,
  faPlusCircle,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setAppVersion } from "~utils/cache";
import { version } from "../../package.json";

function initializeIcons(): void {
  library.add(
    faAngleDown,
    faHamburger,
    faHome,
    faQuestionCircle,
    faFolderOpen,
    faTrash,
    faPlusCircle
  );
}

export default function main(): void {
  initializeIcons();
}

setAppVersion(version);
