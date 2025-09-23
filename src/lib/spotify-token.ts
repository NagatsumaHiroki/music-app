import axios from 'axios';
import { log } from './logging';

export async function generateToken(decodedId: string, decodedSecret: string) {
  try {
    log.info('Spotify トークン取得中...');
    
    // client_idとclient_secretの処理（slice(10)が適切かチェック）
    const clientId = decodedId.length > 10 ? decodedId.slice(10) : decodedId;
    const clientSecret = decodedSecret.length > 10 ? decodedSecret.slice(10) : decodedSecret;
    
    log.info('デコード後の値:');
    log.info('decodedId full:', decodedId);
    log.info('decodedSecret full:', decodedSecret);
    log.info('Client ID (after slice):', clientId);
    log.info('Client Secret (after slice):', clientSecret);
    log.info('Client ID length:', clientId.length);
    log.info('Client Secret length:', clientSecret.length);
    
    // URLSearchParamsを使用してform-urlencoded形式でデータを作成
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    log.info('Spotify トークン取得成功');
    return response.data.access_token;
  } catch (error) {
    log.error("Spotify トークン取得エラー:", error);
    throw error;
  }
}

async function initialize() {
  const clientIdEnv = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecretEnv = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  
  log.info('環境変数チェック:');
  log.info('NEXT_PUBLIC_SPOTIFY_CLIENT_ID:', clientIdEnv ? 'あり' : 'なし');
  log.info('NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET:', clientSecretEnv ? 'あり' : 'なし');
  log.info('全ての環境変数:', Object.keys(process.env).filter(key => key.includes('SPOTIFY')));
  
  if (!clientIdEnv || !clientSecretEnv) {
    throw new Error('Spotify認証情報が設定されていません。環境変数 NEXT_PUBLIC_SPOTIFY_CLIENT_ID と NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET を設定してください。');
  }
  
  try {
    const decodedId = atob(clientIdEnv);
    const decodedSecret = atob(clientSecretEnv);
    log.info('環境変数の取得と Base64 デコードが成功しました');
    return await generateToken(decodedId, decodedSecret);
  } catch (error) {
    log.error('Base64デコードエラー:', error);
    throw new Error('Spotify認証情報のデコードに失敗しました。正しいBase64形式で設定されているか確認してください。');
  }
}

export async function fetchToken() {
  return initialize();
}
