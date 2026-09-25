const KEYS={users:'ms_users',cattle:'ms_cattle',predictions:'ms_predictions',notifications:'ms_notifications',faqs:'ms_faqs',activity:'ms_activity',cookies:'ms_cookies',session:'ms_session'};
export const get=(key,fallback)=>{try{const v=localStorage.getItem(KEYS[key]||key);return v?JSON.parse(v):fallback}catch{return fallback}};
export const set=(key,value)=>localStorage.setItem(KEYS[key]||key,JSON.stringify(value));
export const remove=key=>localStorage.removeItem(KEYS[key]||key);
export const keys=KEYS;
export const uid=(prefix='ID')=>`${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`.toUpperCase();
export const seedIfNeeded=(data)=>{Object.entries(data).forEach(([k,v])=>{if(localStorage.getItem(KEYS[k])===null)set(k,v)})};
