import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';
import * as settings from '../settings';

async function getJWK() {
  const res = await fetch(`https://${settings.domain}/.well-known/jwks.json`);
  const jwk = await res.json();
  return jwk;
}

function saveToken(jwtToken, accessToken) {
  Cookie.set('user', jwt.decode(jwtToken));
  Cookie.set('jwtToken', jwtToken);
};

function deleteToken() {
  Cookie.remove('user');
  Cookie.remove('jwtToken');
};

async function verifyToken(token) {
  if (token) {
    const decodedToken = jwt.decode(token, { complete: true });
    const jwk = await getJWK();
    let cert = jwk.keys[0].x5c[0];
    cert = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    if (jwk.keys[0].kid === decodedToken.header.kid) {
      try {
        jwt.verify(token, cert);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}

async function getTokenForBrowser() {
  const token = Cookie.getJSON('jwtToken');
  const validToken = await verifyToken(token);
  if (validToken) {
    return Cookie.getJSON('user');
  }
}

async function getTokenForServer(req) {
  if (req.headers.cookie) {
    const jwtFromCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwtToken='));
    if (!jwtFromCookie) {
      return undefined;
    }
    const token = jwtFromCookie.split('=')[1];
    const validToken = await verifyToken(token);
    if (validToken) {
      return jwt.decode(token);
    } else {
      return undefined;
    }
  }
}

export {
  saveToken,
  deleteToken,
  getTokenForBrowser,
  getTokenForServer,
  verifyToken
};