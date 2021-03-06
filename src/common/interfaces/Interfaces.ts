import RegularAccount from '../../bitcoin/services/accounts/RegularAccount';
import TestAccount from '../../bitcoin/services/accounts/TestAccount';
import SecureAccount from '../../bitcoin/services/accounts/SecureAccount';
import S3Service from '../../bitcoin/services/sss/S3Service';
import {
  MetaShare,
  EncDynamicNonPMDD,
} from '../../bitcoin/utilities/Interface';

export interface Database {
  WALLET_SETUP: {
    walletName: string;
    security: { question: string; answer: string };
  };
  DECENTRALIZED_BACKUP: {
    RECOVERY_SHARES: {
      [SHARE_INDEX: string]: {
        REQUEST_DETAILS: { TAG: string; KEY: string };
        META_SHARE?: MetaShare;
        ENC_DYNAMIC_NONPMDD?: EncDynamicNonPMDD;
      };
    };
    SHARES_TRANSFER_DETAILS: {
      [SHARE_INDEX: string]: {
        OTP: string;
        ENCRYPTED_KEY: string;
        UPLOADED_AT: number;
      };
    };
    UNDER_CUSTODY: {
      [TAG: string]: {
        META_SHARE: MetaShare;
        ENC_DYNAMIC_NONPMDD: EncDynamicNonPMDD;
      };
    };
    DYNAMIC_NONPMDD: DynamicNonPMDD;
  };
  SERVICES?: {
    REGULAR_ACCOUNT: string;
    TEST_ACCOUNT: string;
    SECURE_ACCOUNT: string;
    S3_SERVICE: string;
    TRUSTED_CONTACTS: string;
  };
}

export interface DatabaseManageBackup {
  PDFDETAILS: {};
}

export interface Services {
  REGULAR_ACCOUNT?: RegularAccount;
  TEST_ACCOUNT?: TestAccount;
  SECURE_ACCOUNT?: SecureAccount;
  S3_SERVICE?: S3Service;
}

export interface DynamicNonPMDD {
  META_SHARES?: MetaShare[];
}
