import { Metadata } from '@grpc/grpc-js';
import { Logger } from '@nestjs/common';

export const getMetadata = (headers: any): any => {
  if (typeof headers !== 'object' || headers === null) {
    throw new Error('headers must be an object');
  }

  const metadata = new Metadata();

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      metadata.add(key, headers[key]);
    }
  }
  return metadata;
};

const isTrueSet = (myValue) => myValue.toString().toLowerCase() === 'true';

export const tranformBoolean = (object): any => {
  try {
    if (object === null) return {};
    const json = {};
    for (const key in object) {
      if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        typeof object[key] !== 'object' &&
        object[key] !== undefined
      ) {
        if (
          object[key].toString().toLowerCase() === 'true' ||
          object[key].toString().toLowerCase() === 'false'
        ) {
          json[key] = isTrueSet(object[key]);
        } else {
          json[key] = object[key];
        }
      } else if (
        Object.prototype.hasOwnProperty.call(object, key) &&
        typeof object[key] === 'object' &&
        object[key] !== null
      ) {
        json[key] = Array.isArray(object[key])
          ? object[key]
          : tranformBoolean(object[key]);
      } else {
        json[key] = object[key];
      }
    }

    return JSON.parse(JSON.stringify(json));
  } catch (err) {
    Logger.error('Transform Error', err);
    throw new Error(err.message);
  }
};
