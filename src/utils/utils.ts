export const getFormattedTime = (): string => {
  const now = new Date();

  // 날짜와 시간 포맷팅
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  //2025-02-22 22:41:45.430733
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getFormattedTimeByDate = (d: number): string => {
  const now = new Date(d);

  // 날짜와 시간 포맷팅
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  //2025-02-22 22:41:45.430733
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const toCamelCase = (object: any) => {
  let newObject: any = {};
  var keys = Object.keys(object);
  const toCamelCase = (message: string) => {
    message = message.toLowerCase();
    message = message.replace(/-/gi, ' ');
    message = message.replace(/_/gi, ' ');
    let messages = message.split(' ').map((e, i) => {
      if (i > 0) {
        e = e.substring(0, 1).toUpperCase() + e.substring(1);
      }
      return e;
    });
    return messages.join('');
  };
  for (let i = 0; i < keys.length; i++) {
    newObject[toCamelCase(keys[i])] = object[keys[i]];
  }
  return newObject;
};

export const currentDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
