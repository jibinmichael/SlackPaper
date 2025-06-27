const { config, SLACK_SCOPES } = require('../../lib/config');

module.exports = (req, res) => {
  // Build Slack OAuth URL
  const params = new URLSearchParams({
    client_id: config.SLACK_CLIENT_ID,
    scope: SLACK_SCOPES.BOT.join(','),
    redirect_uri: `${config.APP_URL}/slack/oauth`
  });

  const installUrl = `https://slack.com/oauth/v2/authorize?${params.toString()}`;

  // Send installation page
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Install Paper to Slack</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
          }
          h1 {
            color: #1a1a1a;
            margin-bottom: 10px;
          }
          .logo {
            font-size: 48px;
            margin-bottom: 20px;
          }
          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .features {
            text-align: left;
            margin: 20px 0;
          }
          .features li {
            margin: 10px 0;
            color: #555;
          }
          .install-btn {
            display: inline-block;
            background: #4A154B;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            transition: background 0.2s;
          }
          .install-btn:hover {
            background: #3e1240;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">📄</div>
          <h1>Paper for Slack</h1>
          <p>AI-powered Canvas assistant that automatically creates and maintains organized summaries of your conversations.</p>
          
          <ul class="features">
            <li>🧠 Auto-generates structured Canvas summaries</li>
            <li>✅ Extracts action items with assignees</li>
            <li>📌 Captures key decisions and links</li>
            <li>🔄 Updates in real-time as conversations evolve</li>
          </ul>
          
          <a href="${installUrl}" class="install-btn">
            Add to Slack
          </a>
        </div>
      </body>
    </html>
  `);
}; 