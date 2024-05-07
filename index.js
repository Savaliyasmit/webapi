"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var baileys_1 = __importStar(require("@whiskeysockets/baileys"));
var logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
var qrcode_1 = require("qrcode");
var express_1 = __importDefault(require("express"));
var express_2 = require("express");
// import makeInMemoryStore from "./store.ts";
var logger = logger_1.default.child({});
logger.level = 'debug';
var baileysStoreMulti = './baileys_store_multi.json';
var baileysAuthInfo = './baileys_auth_info';
console.log('datadir', __dirname);
var useStore = !process.argv.includes('--no-store');
var sock;
var connectionState = { connection: 'connecting' };
var startSock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, state, saveCreds, _b, version, isLatest;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, baileys_1.useMultiFileAuthState)(baileysAuthInfo)];
            case 1:
                _a = _c.sent(), state = _a.state, saveCreds = _a.saveCreds;
                return [4 /*yield*/, (0, baileys_1.fetchLatestBaileysVersion)()];
            case 2:
                _b = _c.sent(), version = _b.version, isLatest = _b.isLatest;
                console.log("using WA v".concat(version.join('.'), ", isLatest: ").concat(isLatest));
                sock = (0, baileys_1.default)({
                    browser: ['StatusSaver', 'smit', '4.0.0'],
                    version: version,
                    logger: logger,
                    printQRInTerminal: true,
                    mobile: false,
                    auth: {
                        creds: state.creds,
                        keys: (0, baileys_1.makeCacheableSignalKeyStore)(state.keys, logger),
                    },
                    generateHighQualityLinkPreview: true,
                });
                sock.ev.process(function (events) { return __awaiter(void 0, void 0, void 0, function () {
                    var update, connection, lastDisconnect;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        if (events['connection.update']) {
                            update = events['connection.update'];
                            connectionState = __assign(__assign({}, connectionState), update);
                            connection = update.connection, lastDisconnect = update.lastDisconnect;
                            if (connection === 'close') {
                                // reconnect if not logged out
                                if (((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== baileys_1.DisconnectReason.loggedOut) {
                                    startSock();
                                }
                                else {
                                    sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('connection.update');
                                    sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messaging-history.set');
                                    sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messages.update');
                                    sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messages.upsert');
                                    // fs.rmSync(baileysAuthInfo, {recursive: true, force: true});
                                    setTimeout(function () {
                                        startSock();
                                        sock === null || sock === void 0 ? void 0 : sock.ev.on("creds.update", saveCreds);
                                    }, 1000);
                                }
                            }
                        }
                        return [2 /*return*/];
                    });
                }); });
                sock === null || sock === void 0 ? void 0 : sock.ev.on("creds.update", saveCreds);
                return [2 /*return*/, sock];
        }
    });
}); };
startSock();
var router = (0, express_2.Router)();
router.get('/getStatuses', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var statuses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (sock === null || sock === void 0 ? void 0 : sock.fetchBlocklist())];
            case 1:
                statuses = _a.sent();
                res.status(200).json(statuses);
                return [2 /*return*/];
        }
    });
}); });
// router.get('/getStatusDetails', async (req:any, res:any) => {
//   const id = req.query.id?.toString();
//   if (id) {
//     const message = await store?.loadMessage('status@broadcast', id);
//     if (message) {
//       res.status(200).json(message);
//     } else {
//       res.status(404).json({ error: 'Status message not found' });
//     }
//   } else {
//     res.status(400).json({ error: 'Missing status message ID' });
//   }
// });
// router.get('/downloadStatus', async (req:any, res:any) => {
//  e const id = req.query.id?.toString();
//   if (id) {
//     const message = await store?.loadMessage('status@broadcast', id);
//     if (message) {
//       const stream = await downloadContentFromMessage(message, 'stream');
//       stream.pipe(res);
//     } else {
//       res.status(404).json({ error: 'Status message not found' });
//     }
//   } else {
//     res.status(400).json({ rror: 'Missing status message ID' });
//   }
// });
router.get('/getConnectionState', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var qr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                qr = connectionState.qr;
                if (!qr) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, qrcode_1.toDataURL)(qr)];
            case 1:
                qr = _a.sent();
                _a.label = 2;
            case 2:
                res.status(200).json(__assign(__assign({}, connectionState), { qr: qr }));
                return [2 /*return*/];
        }
    });
}); });
router.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // fs.rmSync(baileysAuthInfo, { recursive: true, force: true });
            if (baileysAuthInfo) {
                setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('connection.update');
                                sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('connection.update');
                                sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messaging-history.set');
                                sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messages.update');
                                sock === null || sock === void 0 ? void 0 : sock.ev.removeAllListeners('messages.upsert');
                                return [4 /*yield*/, startSock()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/, res.status(200).json({ message: "Successfully logged out" })];
            }
            else {
                return [2 /*return*/, res.status(500).json({ message: "Logout failed" })];
            }
        }
        catch (e) {
            console.error(e);
            return [2 /*return*/, res.status(500).json({ message: "Logout failed or something went wrong..." })];
        }
        return [2 /*return*/];
    });
}); });
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '15mb' }));
app.use(express_1.default.urlencoded({ limit: '15mb', extended: true }));
app.use('/', router);
app.all('*', function (req, res) { return res.status(404).json({ error: 'URL not found' }); });
var host = process.env.HOST || '0.0.0.0';
var port = Number(process.env.PORT || 3000);
var listener = function () { return console.log("Server is listening on http://".concat(host, ":").concat(port)); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        app.listen(port, host, listener);
        return [2 /*return*/];
    });
}); })();
