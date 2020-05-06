const dev = {
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_rUQx0fSr9",
        APP_CLIENT_ID: "3nbscj1jksmle822cbecodea0l",
        IDENTITY_POOL_ID: "us-east-2:f8890d83-9b12-451f-995e-9d9f999fd760"
    }
};

const prod = {
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://fy9hpw4mfa.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_rUQx0fSr9",
        APP_CLIENT_ID: "3nbscj1jksmle822cbecodea0l",
        IDENTITY_POOL_ID: "us-east-2:f8890d83-9b12-451f-995e-9d9f999fd760"
    }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
};