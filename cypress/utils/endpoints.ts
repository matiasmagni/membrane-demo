const endpoints: any = {
    'Login': 'https://api-staging.membrane.trade/v2/login',
};

export const getEndpointUrl = (endpointName: string) => endpoints[endpointName];

export default { getEndpointUrl };
