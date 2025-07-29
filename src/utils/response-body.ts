const record = <T>(payload: { resource: T }) => {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
};

const records = <T>(payload: { resources: T }) => {
  return {
    success: true,
    data: { results: payload.resources },
  };
};

const paginated = <T>(payload: {
  resources: T;
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}) => {
  const { resources: results, ...meta } = payload;
  return {
    success: true,
    data: { results, meta },
  };
};

const auth = <T>(payload: { accessToken: string; user: T }) => {
  return {
    success: true,
    data: { ...payload },
  };
};

const error = <T>(payload: { name: string; message: string; details?: T }) => {
  return {
    success: false,
    data: { error: { ...payload } },
  };
};

const success = (payload: { message: string }) => {
  return {
    success: true,
    data: payload,
  };
};

const updated = <T>(payload: { resource: T }) => {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
};

export default {
  auth,
  error,
  paginated,
  record,
  records,
  success,
  updated,
};
