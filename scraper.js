const puppeteer = require('puppeteer');

(async function scrape() {
	const browser = await puppeteer.launch({ headless: false });

	const page = await browser.newPage();
	await page.goto('https://www.xxxx.com/');

	await page.waitForSelector('#article-details');
	
	// Product Title
	const title = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[1]");
	const productTitle = await title[0].evaluate((t) => {
		let title = t.querySelector('h1');
		
		return title.textContent.trim();
	})
	console.log(productTitle)

	// Brand logo
	const logo = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[1]");
	const brandLogo = await logo[0].evaluate((t) => {
		let imageUrl = t.querySelector('picture img');
		
		imageUrl = (imageUrl === null) ? null : imageUrl.src
		
		return imageUrl;
	})
	console.log(brandLogo)

	// Old Price
	const priceDetails = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[3]/div/div[@class='price']/div[1]/div[1]");
	const prices = await priceDetails[0].evaluate((t) => {
		let label = t.querySelector('.col-xs-8');
		let price = t.querySelector('.col-xs-4 .price-old');
		let currency = t.querySelector('.col-xs-4 .price-old-currency');
		
		return {
			label: (label === null) ? null : label.textContent.trim(),
			price: (price === null) ? null : price.textContent.trim(),
			currency: (currency === null) ? null : currency.textContent.trim(),
		}
	})
	console.log(prices)

	// Other Price
	const otherPriceDetails = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[3]/div/div[@class='price']/div[1]/div[3]");
	const otherPrices = await otherPriceDetails[0].evaluate((t) => {
		let label = t.querySelector('.col-xs-8');
		let price = t.querySelector('.col-xs-4');

		return {
			label: (label === null) ? null : label.textContent.trim(),
			price: (price === null) ? null : price.textContent.trim(),
		}
	})
	console.log(otherPrices)

	// Final Price
	const finalPriceDetails = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[3]/div/div[@class='price']/div[1]/div[4]");
	const finalPrices = await finalPriceDetails[0].evaluate((t) => {
		let label = t.querySelector('.col-xs-8');
		let price = t.querySelector('.col-xs-4');

		return {
			label: (label === null) ? null : label.textContent.trim(),
			price: (price === null) ? null : price.textContent.trim(),
		}
	})
	console.log(finalPrices)

		// Other Price INfo
		const otherPriceInfo = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[3]/div/div[@class='price']");
		const otherPrice = await otherPriceInfo[0].evaluate((t) => {
			let category = t.querySelector('#article-full-price .delivery')
			let price = t.querySelector('#article-full-price .price-new')
			let text = t.querySelector('.text-paragraph1-semibold')
	
			return {
				category: (category === null) ? null : category.textContent.trim(),
				price: (price === null) ? null : price.textContent.trim(),
				text: (text === null) ? null : text.textContent.trim()
			}
		})
		console.log(otherPrice)

	// Preview image
	const previewImage = await page.$x("//div[@id='article-image']");
	const previewImageDetails = await previewImage[0].evaluate((t) => {
		let imageUrl = t.querySelector('figure a').href;
		
		return imageUrl;
	})
	console.log(previewImageDetails)

	// Product thumb images
	const thumbImages = await page.$x("//ul[@id='article-image-thumbnails']/li");
	let tImages = []
	for (let k = 0; k < thumbImages.length; k++) {
		tImages[k] = await thumbImages[k].evaluate((thumbImage) => {
			const thumbImageURL = thumbImage.querySelector('figure a');

			return {
				imageUrl: (thumbImageURL === null) ? null : thumbImageURL.href
			}
		})
	}
	console.log(tImages)
	
	// Product attributes
	const itemProperties = await page.$x("//div[@class='col-xs-12 col-sm-7']/div[4]/div/div[1]/div")
	let results = []
	for (let k = 0; k < itemProperties.length; k++) {
		results[k] = await itemProperties[k].evaluate((itemProperty) => {
			const label = itemProperty.querySelector('.text-paragraph2-semibold');
			const labelValue = itemProperty.querySelector('.text-paragraph2');

			return {
				label: (label === null) ? null : label.textContent.trim(),
				labelValue: (labelValue === null ) ? null : labelValue.textContent.trim()
			}
		})
	}
	console.log(results)

	await browser.close();
	// scraping logic comes here…
})();