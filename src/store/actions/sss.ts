// types and action creators: dispatched by components and sagas

export const INIT_HEALTH_CHECK = "INIT_HEALTH_CHECK";
export const PREPARE_MSHARES = "PREPARE_MSHARES";
export const UPLOAD_ENC_MSHARES = "UPLOAD_ENC_MSHARES";
export const UPLOAD_REQUESTED_SHARE = "UPLOAD_REQUESTED_SHARE";
export const DOWNLOAD_MSHARE = "DOWNLOAD_MSHARE";
export const UPDATE_MSHARES_HEALTH = "UPDATE_MSHARES_HEALTH";
export const CHECK_MSHARES_HEALTH = "CHECK_MSHARES_HEALTH";
export const REQUEST_SHARE = "REQUEST_SHARE";
export const UPDATE_DYNAMINC_NONPMDD = "UPDATE_DYNAMINC_NONPMDD";
export const DOWNLOAD_DYNAMIC_NONPMDD = "DOWNLOAD_DYNAMIC_NONPMDD";
export const RECOVER_MNEMONIC = "RECOVER_MNEMONIC";

export const S3_LOADING = "S3_LOADING";

export const initHealthCheck = () => {
  return { type: INIT_HEALTH_CHECK };
};

export const prepareMShares = () => {
  return { type: PREPARE_MSHARES };
};

export const uploadEncMShares = (shareIndex: number) => {
  return { type: UPLOAD_ENC_MSHARES, payload: { shareIndex } };
};

export const uploadRequestedShare = (tag, encryptedKey, otp) => {
  return { type: UPLOAD_REQUESTED_SHARE, payload: { tag, encryptedKey, otp } };
};

export const downloadMShare = (otp, encryptedKey, downloadType?) => {
  return {
    type: DOWNLOAD_MSHARE,
    payload: { otp, encryptedKey, downloadType }
  };
};

export const updateMSharesHealth = () => {
  return { type: UPDATE_MSHARES_HEALTH };
};

export const checkMSharesHealth = () => {
  return { type: CHECK_MSHARES_HEALTH };
};

export const requestShare = () => {
  return { type: REQUEST_SHARE };
};

export const updateDynamicNonPMDD = () => {
  return { type: UPDATE_DYNAMINC_NONPMDD };
};

export const downloadDynamicNonPMDD = walletId => {
  return { type: DOWNLOAD_DYNAMIC_NONPMDD, payload: { walletId } };
};
export const recoverMmnemonic = (metaShares, securityAns) => {
  return { type: RECOVER_MNEMONIC, payload: { metaShares, securityAns } };
};

export const switchS3Loader = beingLoaded => {
  return { type: S3_LOADING, payload: { beingLoaded } };
};

// types and action creators (saga): dispatched by saga workers
export const HEALTH_CHECK_INITIALIZED = "HEALTH_CHECK_INITIALIZED";
export const MNEMONIC_RECOVERED = "MNEMONIC_RECOVERED";

export const healthCheckInitialized = () => {
  return { type: HEALTH_CHECK_INITIALIZED };
};

export const mnemonicRecovered = mnemonic => {
  return { type: MNEMONIC_RECOVERED, payload: { mnemonic } };
};
