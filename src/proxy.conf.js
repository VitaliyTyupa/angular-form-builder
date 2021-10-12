const PROXY_CONFIG = [
{
context: [
'/microservice/**',
'/api/**',
'/ui/**',
'/switch_user/**',
'/admin/**',
],
target: 'https://innovation.boostr.com/',
secure: false,
changeOrigin: true,
},
];

module.exports = PROXY_CONFIG;
