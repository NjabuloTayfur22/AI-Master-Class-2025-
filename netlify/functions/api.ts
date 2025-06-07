import { Handler } from '@netlify/functions'

const mockUser = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
  tier: "Elite"
};

const handler: Handler = async (event, context) => {
  const path = event.path.replace('/.netlify/functions/api/', '');

  switch (path) {
    case 'health':
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'ok' })
      };

    case 'user':
      return {
        statusCode: 200,
        body: JSON.stringify(mockUser)
      };

    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
      };
  }
}

export { handler };
