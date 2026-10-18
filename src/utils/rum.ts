import {onLCP, onINP, onCLS, type Metric} from "web-vitals";

const SERVER_URL =
    process.env.REACT_APP_SERVER_URL ||
    "https://blog-server.decollzoq.workers.dev";

function sendToRUM(metric: Metric) {
    const body = JSON.stringify({
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        path: window.location.pathname,
        id: metric.id,
        timestamp: new Date().toISOString(),
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([body], {type: "application/json"});
        navigator.sendBeacon(`${SERVER_URL}/api/rum`, blob);
    }
}

export function initWebVitals() {
    onLCP(sendToRUM);
    onINP(sendToRUM);
    onCLS(sendToRUM);
}
