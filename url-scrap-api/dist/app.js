"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
// import '/puppeteer';
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // return 'Hello';
    // Example usage
    // scrapeData('https://example.com')
    //     .then(titles => {
    //         console.log(titles);
    //     }).catch(error => {
    //     console.error(error);
    // });
    const $ = yield fetchHTML("https://example.com");
    console.log(`Site HTML: ${$.html()}\n\n`);
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
const fetchHTML = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(url);
    return cheerio.load(data);
});
// const scrapeData = async (url) => {
//     // Launch Puppeteer
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     // Go to the URL and wait for the page to load
//     await page.goto(url, {waitUntil: 'networkidle2'});
//     // Get page content
//     const content = await page.content();
//     // Close the browser
//     await browser.close();
//
//     // Use Cheerio to parse the page content
//     const $ = cheerio.load(content);
//
//     // Example: Extracting titles from a blog page
//     const titles = [];
//     $('h2').each((index, element) => {
//         titles.push($(element).text().trim());
//     });
//
//     // Return the extracted data
//     return titles;
// }
//# sourceMappingURL=app.js.map