/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "BASE_URL": "https://flowers2.vercel.app/",
    "MONGO_URL": "mongodb+srv://db_user:AJvQwd7QTVRA7D@cluster0.dos09.mongodb.net/tiendaflores?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "tKtLY;MAJN79)d+AG^B&sCrL5qj-w4@67YW@z'\qed3@)9Bx",
    "REFRESH_TOKEN_SECRET": "M[{W5e3/X;tdZUR={T'*m)hM&6M^-C~dgsK;WtHcEb9vA`NW4CCJ9xtY~DB<8,~u.5J389w&)PR7ufs",
    "PAYPAL_CLIENT_ID": "AWoSBP1xkiu5S39QlJ7tS3bbTslJX5SvVD1G-7aNikdfJaiAbVEC933udpvPF8wwLV3CEwN4LORBNszr"
  },
  headers: [
    { key: "Access-Control-Allow-Origin", value: "*" },
  ],
}

module.exports = nextConfig
