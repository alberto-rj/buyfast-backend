function record<T>(payload: { resource: T }): {
  success: boolean;
  data: { results: T[] };
} {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
}

function records<T>(payload: { resources: T }): {
  success: boolean;
  data: { results: T };
} {
  return {
    success: true,
    data: { results: payload.resources },
  };
}

function paginated<T>(payload: {
  resources: T;
  total: number;
  page: number;
  pages: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}): {
  success: boolean;
  data: {
    results: T;
    meta: {
      total: number;
      page: number;
      pages: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
} {
  const { resources: results, ...meta } = payload;
  return {
    success: true,
    data: { results, meta },
  };
}

function auth<T>(payload: { accessToken: string; user: T }): {
  success: boolean;
  data: { accessToken: string; user: T };
} {
  return {
    success: true,
    data: { ...payload },
  };
}

function error<T>(payload: {
  status: number;
  name: string;
  message: string;
  details?: T;
}): {
  success: boolean;
  data: {
    error: { status: number; name: string; message: string; details?: T };
  };
} {
  return {
    success: false,
    data: { error: { ...payload } },
  };
}

function success(payload: { message: string }): {
  success: boolean;
  data: { message: string };
} {
  return {
    success: true,
    data: payload,
  };
}

function updated<T>(payload: { resource: T }): {
  success: boolean;
  data: { results: T[] };
} {
  return {
    success: true,
    data: { results: [payload.resource] },
  };
}

export default {
  auth,
  error,
  paginated,
  record,
  records,
  success,
  updated,
};
