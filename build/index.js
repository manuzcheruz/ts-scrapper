"use strict";
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
        while (_) try {
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
var playwright_1 = require("playwright");
var axios_1 = __importDefault(require("axios"));
var getLinks_1 = __importDefault(require("./getLinks"));
(function Scrapper() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, searchPhrase, results, links, finalData, url, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto('https://www.amazon.co.uk/', { timeout: 0 })];
                case 4:
                    _a.sent();
                    searchPhrase = 'iphone 12';
                    return [4 /*yield*/, page.fill('input[id="twotabsearchtextbox"]', searchPhrase)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('input[id="nav-search-submit-button"]', { timeout: 0 })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('div[class="a-section a-spacing-small a-spacing-top-small"]')];
                case 7:
                    results = _a.sent();
                    if (!results) return [3 /*break*/, 11];
                    return [4 /*yield*/, page.$$('h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-2"]>a')];
                case 8:
                    links = _a.sent();
                    return [4 /*yield*/, getLinks_1.default(links, page)];
                case 9:
                    finalData = _a.sent();
                    url = 'https://car-rental-7028b-default-rtdb.firebaseio.com/amazon.json';
                    return [4 /*yield*/, axios_1.default(url, {
                            method: 'POST',
                            headers: {
                                'contents-type': 'application/json'
                            },
                            data: finalData
                        })];
                case 10:
                    response = _a.sent();
                    if (response.status === 200) {
                        console.log('success!!');
                    }
                    _a.label = 11;
                case 11: return [4 /*yield*/, page.close()];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
