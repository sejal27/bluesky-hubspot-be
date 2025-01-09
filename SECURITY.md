# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to sparikh@hubspot.com. All security vulnerabilities will be promptly addressed.

Please do not publicly disclose the issue until it has been addressed by the maintainers.

## Security Considerations

1. This application handles OAuth tokens and should be deployed with HTTPS only
2. Environment variables must be properly set and secured
3. Rate limiting is in place to prevent abuse
4. Input validation is implemented for all user inputs
5. Error messages are sanitized to prevent information leakage

## Configuration

1. Never commit `.env` files
2. Use `.env.example` as a template for required environment variables
3. Ensure all production deployments use secure environment variable storage
4. Set up proper CORS policies in production
