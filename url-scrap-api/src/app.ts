const express = require('express');
const cors = require('cors');

import {Locator, Page, webkit} from "@playwright/test";

const {chromium} = require('playwright');

const app = express();

const getController = async (req: any, res: any): Promise<any> => {
    const browser = await webkit.launch();
    const page = await browser.newPage();
    const {pageUrl, search} = req.query;
    if (search === '') {
        return res.send({count: 0, data: [], message: ''});
    }
    await gotoPage(page, pageUrl, res);
    const data = await searchAndScroll(page, search);
    const count = data.length;
    const message = count > 0 ? `${count} results found` : 'Text not found :(';
    return res.send({count, data, message})
};

const searchAndScroll = async (page: Page, search: Locator) => {
    const regex = new RegExp(`\\b${search}\\b`, "i");
    const textLocator = page.locator(`text=${regex}`);
    let data: string[] = await textLocator.allInnerTexts();
    if (data.length === 0) {
        let keepScrolling = true;
        while (keepScrolling) {
            const prevScrollHeight = await page?.evaluate(() => document.documentElement.scrollHeight);
            await page.evaluate(() => window && window.scrollTo(0, document.documentElement.scrollHeight));
            await page.waitForFunction((prevHeight) => document.documentElement.scrollHeight > prevHeight, prevScrollHeight);
            await page.waitForTimeout(100); // wait page to be loaded
            const results = await textLocator.allInnerTexts();
            if (results.length > 0 || await page.evaluate(() => document.documentElement.scrollHeight) === prevScrollHeight) {
                data = results;
                keepScrolling = false;
            }
        }
    }
    return data.filter(item => !!item.trim());
}


const gotoPage = async (page: Page, pageUrl: string, res) => {
    try {
        await page.goto(fixedUrl(pageUrl));
    } catch (e) {
        const message = 'Could not open the url ' + pageUrl;
        return res.send({count: 0, data: [], message})
    }
}
const fixedUrl = (url: string) => {
    let urlPage = url;
    let httpAdapter = 'https://';
    let www = 'www.';
    if (!url.includes(www)) {
        urlPage = www + url;
    }
    if (!urlPage.startsWith(httpAdapter)) {
        urlPage = 'https://' + urlPage;
    }
    return urlPage;
}

const port = 3001;

app.get('/', cors(), getController);
app.listen(port, () => console.log(`Server running on port ${port}`));