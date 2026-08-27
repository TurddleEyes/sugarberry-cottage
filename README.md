# Sugarberry Cottage — website

This folder is the website. Plain HTML, CSS and JavaScript — no frameworks,
nothing to install, nothing to build. Upload everything in here and it works.

To change your products, open **`admin.html`**. That is the short answer to
most questions below.

## The website files

| File | What it is |
| --- | --- |
| `index.html` | Home page |
| `products.html` | Our Products |
| `about.html` | About Us |
| `order.html` | How to Order |
| `faq.html` | FAQ, allergens, cottage food notice, privacy notice |
| `contact.html` | Contact details and the order inquiry form |
| `admin.html` | **The product manager.** Products, photos, ordering link |
| `photo-finder.html` | Ready-made searches for free photos, one per product |
| `products-data.js` | What the product manager writes |
| `site.css` | Your settings: colors, fonts, page rules, in numbered sections |
| `theme.css` | The design system underneath. You should not need to edit it |
| `script.js` | Menu, product display, filters, inquiry form, back-to-top |
| `images/` | Logo files and the Facebook share card |
| `images/products/` | Product photos, added by the product manager |
| `CNAME` | Tells the host the site answers to sugarberrycottage.net |
| `.nojekyll` | Stops GitHub from reprocessing the files. Leave it alone |
| `README.md` | This file. GitHub shows it on your repository page |

Upload all of them, keeping `images/` as a folder.

`.nojekyll` and `CNAME` have no file extension and `.nojekyll` is empty on
purpose. Both matter. If your computer hides files whose names start with a
dot, turn that setting on before you upload so `.nojekyll` comes along.

## Publishing it on GitHub Pages (free, no limits)

Unzip the download first, so you have a real `publish` folder.

1. Sign in at **github.com** (create a free account if you need one).
2. Click **+** in the top right, then **New repository**.
   - Name it `sugarberrycottage`
   - Choose **Public** — GitHub Pages will not serve a private repo on a
     free account
   - Do not add a README or any other file
   - Click **Create repository**
3. On the empty repository page, click **uploading an existing file**.
4. Open your unzipped `publish` folder, select **everything inside it**, and
   drag it into the browser. Do not drag the `publish` folder itself —
   `index.html` has to end up at the top level of the repository, not inside
   a subfolder.
5. Check `.nojekyll` and `CNAME` are in the list of files being uploaded. If
   they are missing, your computer is hiding them; turn on "show hidden
   files" and drag them in separately.
6. Click **Commit changes**.
7. Go to **Settings → Pages**. Under **Source** choose **Deploy from a
   branch**, set the branch to **main** and the folder to **/ (root)**, then
   **Save**.
8. Wait a minute or two, then reload that page. GitHub shows your address:
   `https://yourusername.github.io/sugarberrycottage/`. Open it and check the
   site works before touching any domain settings.

### Pointing sugarberrycottage.net at it

Only do this once the `github.io` address works.

1. In IONOS, open your domain's **DNS** settings.
2. Change the `A` record for `@` to `185.199.108.153`, then add three more
   `A` records for `@`:
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   All four are GitHub's. Having all four means the site stays up if one of
   GitHub's servers is down.
3. **Disable or delete the `AAAA` record for `@`.** Skipping this is the
   single most common reason a domain keeps showing the old page.
4. Add a `CNAME` record: host `www`, value `yourusername.github.io`.
5. Leave every row marked **Mail** alone.
6. Back in **Settings → Pages** on GitHub, put `sugarberrycottage.net` in the
   **Custom domain** box and save. Once the tick appears, turn on
   **Enforce HTTPS**.

Give it a few hours to spread. Up to a day is normal.

If IONOS will not let you edit those rows, the domain is still attached to an
IONOS placeholder page. Go to **Domains & SSL → sugarberrycottage.net →
Destination** and point it away from that first.

### Updating the site later

In your repository, click the file you want to change, then the pencil icon,
make the edit, and **Commit changes**. The live site updates within a minute.
To replace a lot at once, use **Add file → Upload files** again.

### If you would rather use Netlify

Drag the unzipped `publish` folder onto **app.netlify.com/drop**. The free
tier covers a site this size. Then in Netlify add the custom domain, and in
IONOS set the `@` `A` record to `75.2.60.5` and remove the `AAAA` record.

## Changing your products

**Open `admin.html`.** Double-click it, or once the site is live visit
`sugarberrycottage.net/admin.html`. It is a private page for you: visitors
never see a link to it, and search engines are told to skip it.

What you can do there:

- Add, edit, delete and reorder products
- Change names, prices, descriptions and availability labels
- Drop in a photo for any product. It is shrunk to a sensible size for the
  web automatically, so pictures straight off your phone are fine
- Change your ordering page address, in the box at the top
- Switch ordering on or off with one switch

Your changes are remembered by your browser as you work, so you can close the
tab and come back. Nothing reaches the website until you press **Save
everything**.

### Getting your changes onto the website

Pressing **Save everything** downloads `products-data.js`, plus one `.jpg` for
each new photo. Then:

1. Go to your repository on **github.com**.
2. Click **Add file → Upload files**.
3. Drag in `products-data.js`. It replaces the old one.
4. For photos: open the `images` folder, then `products` inside it, and
   upload them there.
5. Click **Commit changes**. The site updates within a minute.

After the photos are uploaded, press **Clear saved photos** in the product
manager. It only keeps them so you can see them while you work, and clearing
makes room for the next batch.

### Your ordering page

Every **Order online** button points at the address in the box at the top of
`admin.html`, currently your Cash App page. Change it in that one box and
every button on the site follows.

If you switch **Shop open** off, or leave the address empty, visitors see an
opening-soon note instead of a dead button. The product list still shows
either way, so people can always see what you make.

Prices in the list are the ones I suggested from typical market rates, not
worked out from your costs. Add up what a batch costs you, divide by units,
multiply by three or four, and change them to match.

## Where to change everything else

**Photos.** Product photos are handled by the product manager, described
above. For the other pictures on the site — the hero, the About page, the
category cards — each is a grey box with a caption saying what belongs there.
Put your image file in `images/`, then find the matching box in the HTML and
replace this:

    <div class="photo-slot"><span>Your best jam-and-bread photo</span></div>

with this:

    <img src="images/your-photo.jpg" alt="A jar of strawberry jam beside a sliced loaf">

Always write a short `alt` description — it is what people using a screen
reader hear, and what shows if the image fails to load.

**Contact details** are in the footer of all six pages and on the contact
page. Search for `cottagesugarberry@gmail.com` or `217` to find them.

**Where inquiries go.** Open `script.js` and change `ORDER_EMAIL` near the
bottom. The form opens the visitor's own email program with the message
written out; it never sends anything by itself, and the page says so plainly.
If their computer blocks that, the form shows the finished message with a
**Copy the message** button and an **Open in Gmail** link, so nobody is stuck.

**How much notice you need.** `LEAD_TIME_DAYS` in `script.js` controls what
the date box will accept. The wording "5 to 7 days" is ordinary text on the
home, order, products, FAQ and contact pages — change those by hand too.

**The under-construction banner** is the yellow strip at the top of
`index.html`, in the block marked `UNDER CONSTRUCTION NOTICE`. Delete the
whole block when the site is finished.

**Construction decoration** — the rubble, cracks, tape and traffic cone on the
home page are the elements marked `data-deco`. Delete them when you are done.
They sit behind the words and cannot be clicked.

**Shipping** — the site offers shipping within Illinois only, on the contact
page and in the FAQ. The contact form asks pickup or shipping, and that choice
travels in the email.

**Cottage food disclosure** — the required Illinois wording is in three
places: the FAQ page, the notice card on the home page, and the footer of
every page. If the required wording ever changes, update all three.

**Ingredients and allergens** — `faq.html`, the section marked
`INGREDIENTS & ALLERGENS`. Update the allergen list to match your kitchen.
Please do not claim a product is allergy-safe, gluten-free or nut-free unless
that is genuinely true of your kitchen.

**Colors and fonts** — `site.css`, sections 1 and 2. Change a color there and
it updates across the whole site.

**Your own story** — `about.html` has a comment marking the spot for a
paragraph in your own voice, whenever you want to write one.

## Sharing it on Facebook

Paste `https://sugarberrycottage.net` into a post. Facebook reads the title,
description and the share card at `images/share-card.png`. If an old preview
sticks, run the address through Facebook's Sharing Debugger and press
**Scrape Again**.

## A note on honesty

The site makes no claims that are not yours to make: no reviews, no awards, no
customer counts, no certifications, no promises about allergens, and no
pretence that the form has sent an email.
