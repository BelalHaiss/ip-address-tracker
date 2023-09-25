export type Ipify_Response = {
  ip: string;
  location: {
    country: string;
    region: string;
    timezone: string;
  };
  isp: string;
};

export type FETCHER = {
  method?: 'GET' | 'POST';
  url: string;
};
