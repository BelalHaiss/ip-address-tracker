import type { FETCHER, Ipify_Response } from '@/types/apis';

export class IPIFY {
  private queryType: 'ipAddress' | 'domain' | '';
  private apiKey = import.meta.env.VITE_API_KEY;
  private url = `https://geo.ipify.org/api/v2/country?apiKey=${this.apiKey}&`;

  constructor() {
    this.queryType = '';
  }

  isValidIPv4(addr: string) {
    const regex =
      /^((25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]?[0-9])$/;
    return regex.test(addr);
  }

  isValidDomainName(name: string) {
    const regex =
      /^((www\.([a-zA-Z0-9\-]{2,63}\.)+[a-zA-Z]{2,63})|(([a-zA-Z0-9\-]{2,63}\.)+[a-zA-Z]{2,63}))(\.[a-zA-Z]{2,63})?$/;
    return regex.test(name);
  }

  search(value: string) {
    if (this.isValidDomainName(value)) this.queryType = 'domain';
    else if (this.isValidIPv4(value)) this.queryType = 'ipAddress';
    else {
      console.error('value is not valid ip or domain');
      return 'ERROR';
    }
    return fetcher<Ipify_Response>({
      url: this.url + this.queryType + '=' + value
    });
  }
}

const fetcher = async <T>({
  method = 'GET',
  url
}: FETCHER): Promise<void | T> => {
  try {
    const res = await fetch(url, { method });
    const response: T = await res.json();
    return response;
  } catch (error) {
    console.error({ error }, 'fetching');
  }
};
