Open terminal
Ga naar <PROJECT> folder

func init api --worker-runtime node --language typescript
cd api
func new --name message --language typescript --template HttpTrigger
npm install
npm run start

Open tweede terminal
Ga naar <PROJECT>/api folder

npm run watch

Open derde terminal
Ga naar <PROJECT> folder

ng new app --defaults --routing --skip-git
cat << EOF > swa-cli.config.json
{
  "\$schema": "https://raw.githubusercontent.com/Azure/static-web-apps-cli/main/schema/swa-cli.config.schema.json",
  "configurations": {
    "app": {
      "appLocation": "./app",
      "apiLocation": "http://localhost:7071",
      "context": "http://localhost:4200",
      "run": "npm start",
      "devserverTimeout": 30000,
      "open": "false"
    }
  }
}
EOF
swa start

