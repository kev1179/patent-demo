import { Container, Typography, Link } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container sx={{ py: 6, color: 'text.primary' }}>
      <Typography variant="h3" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography paragraph>
        Welcome to **PatentPartner**. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.  
      </Typography>

      <Typography paragraph>
        By accessing or using our platform, you agree to the collection and use of information in accordance with this policy.
      </Typography>

      {/* Section 1: Information Collection */}
      <Typography variant="h5" gutterBottom>
        1. Information We Collect
      </Typography>
      <Typography paragraph>
        When you use **PatentPartner**, we may collect the following types of information:
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>Search Queries:</strong> We collect and process the patent IDs and keywords you enter to retrieve relevant patent details.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Usage Data:</strong> We may gather anonymized usage statistics to improve our service. This includes IP addresses, browser types, and interaction data.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Cookies:</strong> We may use cookies to enhance your user experience. These cookies do not store personal data and can be disabled through your browser settings.
          </Typography>
        </li>
      </ul>

      {/* Section 2: How We Use Your Information */}
      <Typography variant="h5" gutterBottom>
        2. How We Use Your Information
      </Typography>
      <Typography paragraph>
        The information collected is used to:
      </Typography>
      <ul>
        <li>
          <Typography>
            Provide you with accurate patent details based on your search queries.
          </Typography>
        </li>
        <li>
          <Typography>
            Improve our service by analyzing usage trends and optimizing performance.
          </Typography>
        </li>
        <li>
          <Typography>
            Ensure the security and integrity of our platform.
          </Typography>
        </li>
      </ul>

      {/* Section 3: Data Sharing */}
      <Typography variant="h5" gutterBottom>
        3. Data Sharing and Disclosure
      </Typography>
      <Typography paragraph>
        We **do not** sell, trade, or rent your personal data to third parties. However, we may share information in the following cases:
      </Typography>
      <ul>
        <li>
          <Typography>
            If required by law or in response to a legal request (e.g., court order, subpoena).
          </Typography>
        </li>
        <li>
          <Typography>
            To prevent fraud, abuse, or security threats to our platform.
          </Typography>
        </li>
        <li>
          <Typography>
            With service providers that help us operate our platform (e.g., hosting, analytics), who are contractually obligated to protect your data.
          </Typography>
        </li>
      </ul>

      {/* Section 4: Data Security */}
      <Typography variant="h5" gutterBottom>
        4. Data Security
      </Typography>
      <Typography paragraph>
        We take appropriate security measures to protect your data from unauthorized access, alteration, or disclosure. However, no online platform is 100% secure, and we cannot guarantee absolute security.
      </Typography>

      {/* Section 5: User Rights */}
      <Typography variant="h5" gutterBottom>
        5. Your Rights and Choices
      </Typography>
      <Typography paragraph>
        Depending on your jurisdiction, you may have the following rights regarding your data:
      </Typography>
      <ul>
        <li>
          <Typography>
            The right to access and review any data we have collected about you.
          </Typography>
        </li>
        <li>
          <Typography>
            The right to request correction or deletion of your personal data.
          </Typography>
        </li>
        <li>
          <Typography>
            The right to opt out of cookies and tracking technologies.
          </Typography>
        </li>
      </ul>
      <Typography paragraph>
        To exercise any of these rights, please contact us at <Link href="mailto:support@patentpartner.com">support@patentpartner.com</Link>.
      </Typography>

      {/* Section 6: Third-Party Links */}
      <Typography variant="h5" gutterBottom>
        6. Third-Party Links
      </Typography>
      <Typography paragraph>
        Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their policies before providing any personal information.
      </Typography>

      {/* Section 7: Policy Updates */}
      <Typography variant="h5" gutterBottom>
        7. Changes to This Privacy Policy
      </Typography>
      <Typography paragraph>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
      </Typography>

      {/* Section 8: Contact Information */}
      <Typography variant="h5" gutterBottom>
        8. Contact Us
      </Typography>
      <Typography paragraph>
        If you have any questions about this Privacy Policy or our data practices, please contact us at:
      </Typography>
      <Typography paragraph>
        **PatentPartner Support**  
        Email: <Link href="mailto:support@patentpartner.com">support@patentpartner.com</Link>  
        Website: <Link href="https://www.patentpartner.com">www.patentpartner.com</Link>
      </Typography>

    </Container>
  );
};

export default PrivacyPolicy;

