import { Bell, Menu, ScrollText, Search, UserRound } from 'lucide-react';
import { FaArrowCircleLeft, FaUserEdit } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import {
  MdDeleteOutline,
  MdEdit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { TbLogout, TbReportSearch } from 'react-icons/tb';
import { HiOutlineCreditCard, HiOutlineDocumentMinus } from 'react-icons/hi2';
import { CgFileDocument } from 'react-icons/cg';
import { IoReloadCircle, IoSettingsOutline } from 'react-icons/io5';
import { BiLogIn } from 'react-icons/bi';
import { FaRegPenToSquare } from 'react-icons/fa6';

export const ICONS = {
  documentSVG: CgFileDocument,
  dashboardSVG: '/assets/icons/dashboard.svg',
  approvalSVG: BiLogIn,
  invoiceSVG: ScrollText,
  logoSVG: '/assets/icons/logo.svg',
  messageSVG: '/assets/icons/messages.svg',
  paymentSVG: HiOutlineCreditCard,
  postingSVG: FaRegPenToSquare,
  reportSVG: TbReportSearch,
  settingSVG: IoSettingsOutline,
  supplierSVG: HiOutlineDocumentMinus,
  teamSVG: UserRound,
  plusIcon: FiPlus,
  searchIcon: Search,
  bellIcon: Bell,
  leftArrow: FaArrowCircleLeft,
  close: '/assets/icons/close.svg',
  add_invoice: '/assets/icons/add-invoice.svg',
  leftArrowSlider: MdKeyboardArrowLeft,
  rightArrowSlider: MdKeyboardArrowRight,
  loginImage: '/assets/images/login.svg',
  arrowDown: IoIosArrowDown,
  logout: TbLogout,
  delete: MdDeleteOutline,
  userEdit: FaUserEdit,
  menu: Menu,
  edit: MdEdit,
  question_mark: '/assets/icons/question-mark.svg',
  overview_box: '/assets/icons/overview-box.svg',
  setting_project: '/assets/icons/setting-project.svg',
  settings_team: '/assets/icons/settings-team.svg',
  settings_icon: '/assets/icons/settings-icon.svg',
  delete_overview: '/assets/icons/delete.svg',
  edit_overview: '/assets/icons/overviewEdit.svg',
  cart: '/assets/icons/cart.svg',
  rocket: '/assets/icons/rocket.svg',
  wallet: '/assets/icons/wallet.svg',
  wrench: '/assets/icons/wrench.svg',
  table_setting: '/assets/icons/table-setting.svg',
  download: '/assets/icons/download.svg',
  load: IoReloadCircle
};
