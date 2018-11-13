# Short Lnk Info

Basic link shortener. Features:
- Login/signup
- Users can: 
	- Add a link
	- See number of times a link was visited and the last visit time.
	- See the real url and short url.
	- Links to **visit** the short url, **copy** the short url to clipboard, or **hide** the short url (although currently the link still is usable, even if hidden.)
	- Toggle between visible and hidden urls.
- Animations using react-flip-move

View at https://short-link-randomlysa.herokuapp.com


# Run locally
Requirements
- [meteor](https://www.meteor.com/install)
- [nodejs](https://nodejs.org/en/)

**Instructions**
- Clone or download and unzip the project and cd into the dir.
- Run `meteor npm install`
- Run `meteor`
	- By default, the project runs on port 3000. Use `meteor --port #` to specify a different port.
- Open http://localhost:3000 in your browser. 
	
# Deploy to Heroku	
Requirements
- Your Heroku account needs to be verified with a credit card in order to use the `mongolab` addon.
- [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli) 
- [git](https://git-scm.com)

**Instructions**
- Inside the project dir, run `meteror node --version`. This will show the node version the project is using. (Mine is 8.11.4,)
- Modify `package.json` to include this version info under `engine`:
	- `engine: { "node": "node.version.number"}`
- Run `heroku create project-name`
	- Project names are globally shared so you will probably need to use something like `projectname-yourname` (example, I use `projectname-randomlysa`.)
- Run `heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git`
- Run `heroku addons:create mongolab:sandbox`
- Run `heroku config:set ROOT_URL="https://YOUR_PROJECT_URL.herokuapp.com"`
- Run `git push heroku master`
- Wait a long time.
- Open your app!

Also, [meteor-buildpack-horse](https://github.com/AdmitHub/meteor-buildpack-horse), was used above, has instructions on deploying to Heroku.
