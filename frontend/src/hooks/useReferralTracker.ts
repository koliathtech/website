import { useEffect, useState } from 'react';
import { apiUrl } from '../lib/apiBase';
import { onTrackingConsentChange, readTrackingConsent, type TrackingConsent } from '../lib/consent';

const REFERRAL_KEY = 'koliath_ref_code';

async function loadVisitorId(): Promise<string> {
  const { load } = await import('@fingerprintjs/fingerprintjs');
  const fp = await load();
  const result = await fp.get();
  return result.visitorId;
}

export function useReferralTracker() {
  const [consent, setConsent] = useState<TrackingConsent>('unset');
  const [refCode, setRefCode] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    setConsent(readTrackingConsent());
    return onTrackingConsentChange(setConsent);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCode = params.get('ref');
    if (urlCode) {
      setRefCode(urlCode);
      return;
    }
    if (consent === 'granted') {
      setRefCode(localStorage.getItem(REFERRAL_KEY));
    }
  }, [consent]);

  useEffect(() => {
    if (consent !== 'granted') {
      setDeviceId(null);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const visitorId = await loadVisitorId();
        if (cancelled) return;
        setDeviceId(visitorId);

        const params = new URLSearchParams(window.location.search);
        const urlCode = params.get('ref');
        if (!urlCode) return;

        const res = await fetch(
          apiUrl(`/api/referrals/validate?code=${encodeURIComponent(urlCode)}`)
        );
        const data = await res.json();
        if (cancelled || !data.success) return;

        localStorage.setItem(REFERRAL_KEY, urlCode);
        await fetch(apiUrl('/api/referrals/track'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: urlCode,
            eventType: 'visit',
            deviceId: visitorId,
          }),
        });
      } catch (e) {
        console.error('Failed to validate or track referral', e);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [consent]);

  const trackEvent = async (eventType: 'click' | 'visit' | 'install_attempt') => {
    if (consent !== 'granted' || !refCode || !deviceId) return;
    try {
      await fetch(apiUrl('/api/referrals/track'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: refCode,
          eventType,
          deviceId,
        }),
      });
    } catch (e) {
      console.error('Failed to track event', e);
    }
  };

  return { refCode, deviceId, trackEvent, consent };
}
