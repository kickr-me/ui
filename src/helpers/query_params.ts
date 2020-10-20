function getQueryParams(qs: string) {
  qs = qs.split("+").join(" ");

  let params: { [key: string]: string } = {};
  let tokens;
  const re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

export default getQueryParams;
