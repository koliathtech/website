import { useEffect, useState } from 'react';
import fpPromise from '@fingerprintjs/fingerprintjs';
import { apiUrl } from '../lib/apiBase';

const REFERRAL_KEY = 'koliath_ref_code';

export function useReferralTracker() {
  const [refCode, setRefCode] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initialize FingerprintJS
    const initFingerprint = async () => {
      const fp = await fpPromise.load();
      const result = await fp.get();
      setDeviceId(result.visitorId);
      return result.visitorId;
    };

    const processReferral = async (visitorId: string) => {
      const params = new URLSearchParams(window.location.search);
      const urlCode = params.get('ref');
      const localCode = localStorage.getItem(REFERRAL_KEY);

      if (urlCode) {
        // Validate URL Code
        try {
          const res = await fetch(apiUrl(`/api/referrals/validate?code=${encodeURIComponent(urlCode)}`));
          const data = await res.json();
          if (data.success) {
            localStorage.setItem(REFERRAL_KEY, urlCode);
            setRefCode(urlCode);
            
            // Track visit
            await fetch(apiUrl("/api/referrals/track"), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code: urlCode,
                eventType: 'visit',
                deviceId: visitorId
              })
            });
          }
        } catch (e) {
          console.error('Failed to validate referral code', e);
        }
      } else if (localCode) {
        setRefCode(localCode);
      }
    };

    initFingerprint().then(visitorId => processReferral(visitorId));
  }, []);

  const trackEvent = async (eventType: 'click' | 'visit' | 'install_attempt') => {
    if (!refCode || !deviceId) return;
    try {
      await fetch(apiUrl("/api/referrals/track"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: refCode,
          eventType,
          deviceId
        })
      });
    } catch (e) {
      console.error('Failed to track event', e);
    }
  };

  return { refCode, deviceId, trackEvent };
}
