import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';


const icons = [
  faFacebookF, faTwitter, faLinkedinIn, faWhatsapp, faFacebookMessenger, faLink, faCheck
];

library.add(...icons);
