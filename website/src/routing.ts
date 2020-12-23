import Splash from "./pages/Splash";
import Start from "./pages/Start";
import BalanceError from "./pages/BalanceError";
import Confirmation from "./pages/Confirmation";
import Pay from "./pages/Pay";
import Home from "./pages/Home";
import Load from "./pages/Load";
import Success from "./pages/Success";
import UnknownError from "./pages/UnknownError";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import QRCodeScanner from "./pages/QRCodeScanner";

export const urls = {
  start: "/start",
  balanceError: "/not-enough-balance",
  pay: "/pay",
  confirmation: '/confirmation',
  home: "/home",
  load: "/load",
  success: "/success",
  unknownError: "/unknown-error",
  qrCodeGenerator: "/qrcode-gen",
  qrCodeScanner: "/qrcode-scan",
  root: "/",
};

export const routes = [
  { url: urls.start, content: Start, isAuthenticated: false },
  { url: urls.confirmation, content: Confirmation, isAuthenticated: false },
  { url: urls.home, content: Home, isAuthenticated: false },
  { url: urls.pay, content: Pay, isAuthenticated: false },
  { url: urls.load, content: Load, isAuthenticated: false },
  { url: urls.balanceError, content: BalanceError, isAuthenticated: false },
  { url: urls.success, content: Success, isAuthenticated: false },
  { url: urls.unknownError, content: UnknownError, isAuthenticated: false },
  { url: urls.qrCodeGenerator, content: QRCodeGenerator, isAuthenticated: false },
  { url: urls.qrCodeScanner, content: QRCodeScanner, isAuthenticated: false },
  { url: urls.root, content: Splash, isAuthenticated: false },
];