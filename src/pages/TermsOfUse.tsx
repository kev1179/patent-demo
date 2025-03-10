import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Container sx={{ py: 6, color: 'text.primary' }}>
      <Typography variant="h3" gutterBottom>
        Terms of Use
      </Typography>

      <Typography paragraph>
        Welcome to **PatentPartner**. By using our platform, you agree to the following terms and conditions.  
        If you do not agree with any part of these terms, please do not use our services.
      </Typography>

      {/* Section 1: Use of Services */}
      <Typography variant="h5" gutterBottom>
        1. Use of Our Services
      </Typography>
      <Typography paragraph>
        Our platform provides patent-related information for research and reference purposes only.  
        While we strive for accuracy, we **do not guarantee** the completeness, reliability, or legality of any patent data retrieved.  
        Users should always confirm patent details through **official sources**, such as the **United States Patent and Trademark Office (USPTO)** or equivalent organizations in their jurisdiction.
      </Typography>

      {/* Section 2: Account and Security */}
      <Typography variant="h5" gutterBottom>
        2. Account Responsibilities
      </Typography>
      <Typography paragraph>
        If you create an account on our platform, you are responsible for maintaining the confidentiality of your login credentials.  
        **Sharing your account information with anyone else is strictly prohibited.**  
        We reserve the right to suspend or terminate accounts that violate this policy.
      </Typography>

      {/* Section 3: Limitations and Liability */}
      <Typography variant="h5" gutterBottom>
        3. No Legal or Professional Advice
      </Typography>
      <Typography paragraph>
        **PatentPartner is not a legal advisory service.**  
        The content on our platform is provided for informational purposes only and should **not** be relied upon as legal, financial, or technical advice.  
        Always consult a **qualified professional or attorney** before making any decisions related to patents.
      </Typography>

      {/* Section 4: Prohibited Conduct */}
      <Typography variant="h5" gutterBottom>
        4. Prohibited Activities
      </Typography>
      <Typography paragraph>
        You agree **not** to use our platform for any illegal, unauthorized, or harmful activities, including but not limited to:
      </Typography>
      <ul>
        <li>
          <Typography>Scraping, copying, or redistributing patent data in violation of third-party rights.</Typography>
        </li>
        <li>
          <Typography>Attempting to gain unauthorized access to our systems or tampering with security measures.</Typography>
        </li>
        <li>
          <Typography>Impersonating another individual or entity to mislead users.</Typography>
        </li>
      </ul>

      {/* Section 5: Limitation of Liability */}
      <Typography variant="h5" gutterBottom>
        5. Limitation of Liability
      </Typography>
      <Typography paragraph>
        We are **not responsible** for any losses, damages, or legal disputes that arise from using our platform.  
        By using our service, you acknowledge that **PatentPartner is not the definitive source for patent information**, and you should verify results with **official sources** before taking any action.
      </Typography>

      {/* Section 6: Updates and Contact */}
      <Typography variant="h5" gutterBottom>
        6. Updates to These Terms
      </Typography>
      <Typography paragraph>
        We reserve the right to update these Terms of Use at any time.  
        Changes will be posted on this page, and your continued use of the platform constitutes acceptance of the updated terms.
      </Typography>

      <Typography variant="h5" gutterBottom>
        7. Contact Information
      </Typography>
      <Typography paragraph>
        If you have any questions about these terms, please contact us:
      </Typography>
      <Typography paragraph>
        **PatentPartner Support**  
        Email: <Link href="mailto:support@patentpartner.com">support@patentpartner.com</Link>  
        Website: <Link href="https://www.patentpartner.com">www.patentpartner.com</Link>
      </Typography>

    </Container>
  );
};

export default TermsOfUse;
