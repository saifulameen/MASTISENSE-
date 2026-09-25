export const riskClass=l=>({LOW:'text-emerald-700 bg-emerald-50 border-emerald-200',MODERATE:'text-amber-700 bg-amber-50 border-amber-200',HIGH:'text-orange-700 bg-orange-50 border-orange-200','VERY HIGH':'text-red-700 bg-red-50 border-red-200'}[l]||'text-slate-700 bg-slate-50 border-slate-200');
export const formatDate=d=>new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
export const cn=(...x)=>x.filter(Boolean).join(' ');
