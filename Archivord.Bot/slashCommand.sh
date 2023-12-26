curl --request POST \
  --url https://discord.com/api/v10/applications/---CLIENT ID GOES HERE---/commands \
  --header 'Authorization: Bot ---BOT TOKEN GOES HERE---' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "backup",
    "type": 1,
    "description": "Starts a backup in this channel"
}'