import TrustedContactsService from '../../bitcoin/services/TrustedContactsService';
import { SERVICES_ENRICHED } from '../actions/storage';
import { TRUSTED_CONTACTS } from '../../common/constants/serviceTypes';
import {
  TRUSTED_CONTACT_INITIALIZED,
  TRUSTED_CONTACT_APPROVED,
  EPHEMERAL_CHANNEL_FETCHED,
  EPHEMERAL_CHANNEL_UPDATED,
  TRUSTED_CHANNEL_UPDATED,
  TRUSTED_CHANNEL_FETCHED,
} from '../actions/trustedContacts';

const initialState: {
  service: TrustedContactsService;
  serviceEnriched: Boolean;
  initializedTrustedContacts: { [contactName: string]: { publicKey: string } }; //contact name to pubkey mapping
  approvedTrustedContacts: {
    [contactName: string]: {
      approved: Boolean;
    };
  };
  ephemeralChannel: { [contactName: string]: { updated: Boolean; data?: any } };
  trustedChannel: { [contactName: string]: { updated: Boolean; data?: any } };
} = {
  service: null,
  serviceEnriched: false,
  initializedTrustedContacts: null,
  approvedTrustedContacts: null,
  ephemeralChannel: null,
  trustedChannel: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVICES_ENRICHED:
      return {
        ...state,
        service: action.payload.services[TRUSTED_CONTACTS],
        serviceEnriched: true,
      };

    case TRUSTED_CONTACT_INITIALIZED:
      return {
        ...state,
        initializedTrustedContacts: {
          ...state.initializedTrustedContacts,
          [action.payload.contactName]: { publicKey: action.payload.publicKey },
        },
      };

    case TRUSTED_CONTACT_APPROVED:
      return {
        ...state,
        approvedTrustedContacts: {
          ...state.approvedTrustedContacts,
          [action.payload.contactName]: {
            approved: action.payload.approved,
          },
        },
      };

    case EPHEMERAL_CHANNEL_UPDATED:
      return {
        ...state,
        ephemeralChannel: {
          ...state.ephemeralChannel,
          [action.payload.contactName]: {
            updated: action.payload.updated,
            data: action.payload.data,
          },
        },
      };

    case EPHEMERAL_CHANNEL_FETCHED:
      return {
        ...state,
        ephemeralChannel: {
          ...state.ephemeralChannel,
          [action.payload.contactName]: {
            data: action.payload.data,
          },
        },
      };

    case TRUSTED_CHANNEL_UPDATED:
      return {
        ...state,
        trustedChannel: {
          ...state.trustedChannel,
          [action.payload.contactName]: {
            updated: action.payload.updated,
            data: action.payload.data,
          },
        },
      };

    case TRUSTED_CHANNEL_FETCHED:
      return {
        ...state,
        trustedChannel: {
          ...state.trustedChannel,
          [action.payload.contactName]: {
            data: action.payload.data,
          },
        },
      };
  }

  return state;
};
