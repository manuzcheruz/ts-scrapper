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
Object.defineProperty(exports, "__esModule", { value: true });
function getLinks(links, page) {
    return __awaiter(this, void 0, void 0, function () {
        var initialLinks, finalData, i, link, _a, _b, _c, start, title, storeUrl, description, ratings, data;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    initialLinks = [];
                    finalData = [];
                    i = 0;
                    _e.label = 1;
                case 1:
                    if (!(i < links.length)) return [3 /*break*/, 4];
                    link = links[i];
                    _b = (_a = initialLinks).push;
                    _c = "https://www.amazon.co.uk";
                    return [4 /*yield*/, link.getAttribute('href')];
                case 2:
                    _b.apply(_a, [_c + (_e.sent())]);
                    _e.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!initialLinks.length) return [3 /*break*/, 15];
                    start = initialLinks.shift();
                    if (!start) return [3 /*break*/, 14];
                    return [4 /*yield*/, page.goto(start, { timeout: 0 })];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, page.$('h1[id="title"]')];
                case 6:
                    title = _e.sent();
                    return [4 /*yield*/, page.$('div[class="a-section a-spacing-none"]>a[id="bylineInfo"]')];
                case 7:
                    storeUrl = _e.sent();
                    return [4 /*yield*/, page.$('div[id="feature-bullets"]')];
                case 8:
                    description = _e.sent();
                    return [4 /*yield*/, page.$('span[id="acrCustomerReviewText"]')];
                case 9:
                    ratings = _e.sent();
                    _d = {};
                    return [4 /*yield*/, (title === null || title === void 0 ? void 0 : title.innerText())];
                case 10:
                    _d.title = _e.sent();
                    return [4 /*yield*/, (storeUrl === null || storeUrl === void 0 ? void 0 : storeUrl.innerText())];
                case 11:
                    _d.storeUrl = _e.sent();
                    return [4 /*yield*/, (description === null || description === void 0 ? void 0 : description.innerText())];
                case 12:
                    _d.description = _e.sent();
                    return [4 /*yield*/, (ratings === null || ratings === void 0 ? void 0 : ratings.innerText())];
                case 13:
                    data = (_d.ratings = _e.sent(),
                        _d);
                    finalData.push(data);
                    _e.label = 14;
                case 14: return [3 /*break*/, 4];
                case 15: return [2 /*return*/, finalData];
            }
        });
    });
}
exports.default = getLinks;
