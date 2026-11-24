(function () {
  const D = window.CRM, AUJ = new Date(D.aujourdhui + 'T00:00:00');
  const F = {}; D.financeurs.forEach(f => F[f.id] = f);
  const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const dte = s => new Date(s + 'T00:00:00');
  const jour = s => { const d = dte(s); return d.getDate() + ' ' + MOIS[d.getMonth()]; };
  const jourL = s => { const d = dte(s); return JOURS[d.getDay()] + ' ' + d.getDate() + ' ' + MOIS[d.getMonth()]; };
  const ouvres = (a, b) => { let n = 0, d = new Date(a); while (d < b) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n++; } return n; };
  const jrs = s => Math.round((AUJ - dte(s)) / 864e5);
  const fcfa = n => n >= 1e9 ? (n / 1e9).toFixed(2).replace('.', ',') + ' Md F CFA' : (n / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' M F CFA';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ini = s => s.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const AB = { ecobank: 'EB', nsia: 'NS', sgci: 'SG', bicici: 'BI', boa: 'BA', alios: 'AF', loxea: 'LX', atlantique: 'BQ' };
  const mono = f => `<span class="mono" style="background:${f.couleur}">${AB[f.id] || f.court.slice(0, 2).toUpperCase()}</span>`;
  const I = {
    dossier: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    banque: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    alerte: '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    voiture: '<path d="M5 16h14M6 16l1.5-5h9L18 16"/><path d="M4 16v3h3v-3M17 16v3h3v-3M7.5 11 9 7h6l1.5 4"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    rdv: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    wa: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20l1.3-5.2A8.4 8.4 0 1 1 21 11.5z"/>',
    fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    lettre: '<path d="M4 4h16v16H4z"/><path d="m4 4 8 8 8-8"/>',
    oeil: '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    clic: '<path d="m9 9 5 12 1.8-5.2L21 14z"/><path d="M7.2 2.2 8 5.1M5.1 8 2.2 7.2M14 4.1 12 6.2M6.2 12 4.1 14"/>',
    rep: '<path d="M9 17 4 12l5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>'
  };
  const ico = (k, c) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="${c || 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg>`;
  const CANAL = { 'Appel': 'tel', 'E-mail': 'mail', 'Rendez-vous': 'rdv', 'WhatsApp': 'wa' };
  const STATUTS = ['Déposé', 'En étude', 'Accordé', 'Refusé', 'Véhicule livré'];
  const BADGE = { 'Déposé': 'b-gris', 'En étude': 'b-orange', 'Accordé': 'b-bleu', 'Refusé': 'b-rouge', 'Véhicule livré': 'b-vert' };
  const REL = { 'Convention active': 'b-vert', 'Groupe CFAO': 'b-bleu', 'En discussion': 'b-orange', 'Convention à relancer': 'b-orange', 'À approcher': 'b-gris' };

  document.getElementById('maj').textContent = 'À jour au ' + jourL(D.aujourdhui);

  // calculs par financeur
  const dos = D.dossiers.map(d => Object.assign({}, d, { attente: jrs(d.dernier), retard: (d.statut === 'Déposé' || d.statut === 'En étude') && jrs(d.dernier) >= 5 }));
  const stat = {};
  D.financeurs.forEach(f => {
    const l = dos.filter(d => d.financeur === f.id);
    const tr = l.filter(d => d.reponse);
    const ok = tr.filter(d => d.statut !== 'Refusé');
    const delais = tr.map(d => ouvres(dte(d.depot), dte(d.reponse)));
    stat[f.id] = {
      n: l.length, cours: l.filter(d => !d.reponse).length, tranches: tr.length, accords: ok.length,
      taux: tr.length ? Math.round(100 * ok.length / tr.length) : null,
      delai: delais.length ? Math.round(10 * delais.reduce((a, b) => a + b, 0) / delais.length) / 10 : null,
      montant: ok.reduce((a, d) => a + d.montant, 0), vehicules: ok.reduce((a, d) => a + d.qte, 0)
    };
  });
  const tr = dos.filter(d => d.reponse), okAll = tr.filter(d => d.statut !== 'Refusé');
  const alertes = dos.filter(d => d.retard).sort((a, b) => b.attente - a.attente);
  const delaiG = Math.round(10 * tr.reduce((a, d) => a + ouvres(dte(d.depot), dte(d.reponse)), 0) / tr.length) / 10;
  const accTot = D.financeurs.reduce((a, f) => a + stat[f.id].accords, 0), decTot = D.financeurs.reduce((a, f) => a + stat[f.id].tranches, 0);
  const actifs = D.financeurs.filter(f => stat[f.id].n > 0).length;

  // KPI
  const K = [
    ['banque', 'Financeurs suivis', D.financeurs.length, actifs + ' avec des dossiers en cours ou passés', ''],
    ['dossier', 'Dossiers en cours', dos.filter(d => !d.reponse).length, 'sur ' + dos.length + ' dossiers BYD suivis', ''],
    ['check', "Taux d'accord", Math.round(100 * accTot / decTot) + ' %', accTot + ' accords sur ' + decTot + ' décisions', 'noir'],
    ['horloge', 'Délai moyen', String(delaiG).replace('.', ',') + ' j', 'jours ouvrés jusqu\'à la décision', ''],
    ['alerte', 'Sans réponse 5 j', alertes.length, alertes.length ? 'dossiers à relancer' : 'aucun dossier en attente', 'rouge']
  ];
  document.getElementById('kpis').innerHTML = K.map(k => `<div class="kpi ${k[4]}"><div class="k-lib">${ico(k[0])}${k[1]}</div><div class="k-val">${k[2]}</div><div class="k-ref">${k[3]}</div></div>`).join('');

  // alertes
  document.getElementById('alertes').innerHTML = alertes.length ? alertes.map(d => {
    const f = F[d.financeur];
    return `<li class="alerte"><span class="num">${d.attente} j</span><div><p><strong>${esc(d.client)}</strong>, ${d.qte > 1 ? d.qte + ' × ' : ''}${esc(d.modele)} chez ${esc(f.court)}</p>
    <div class="sous">${esc(d.produit)}, ${fcfa(d.montant)}, déposé le ${jour(d.depot)}, dernier retour le ${jour(d.dernier)}, suivi par ${esc(d.vendeur)}</div></div>
    <span class="faire">${ico('tel')}Relancer ${esc(f.contacts[0].nom.split(' ')[0])}</span></li>`;
  }).join('') : '<p class="vide">Aucun dossier sans réponse depuis 5 jours.</p>';

  // entonnoir
  const IC = { 'Déposé': 'dossier', 'En étude': 'horloge', 'Accordé': 'check', 'Refusé': 'x', 'Véhicule livré': 'voiture' };
  document.getElementById('entonnoir').innerHTML = STATUTS.map(s => {
    const l = dos.filter(d => d.statut === s);
    const cls = s === 'Refusé' ? 'refuse' : s === 'Véhicule livré' ? 'livre' : '';
    return `<div class="etape ${cls}"><div class="e-lib">${ico(IC[s])}${s}</div><div class="e-val">${l.length}</div><div class="e-ref">${fcfa(l.reduce((a, d) => a + d.montant, 0))}, ${l.reduce((a, d) => a + d.qte, 0)} véhicules</div></div>`;
  }).join('');

  // graphes
  Chart.defaults.font.family = 'Inter, sans-serif'; Chart.defaults.color = '#6B6B78';
  const fins = D.financeurs.filter(f => stat[f.id].tranches > 0);
  // valeur écrite au bout de chaque barre : le graphe se lit sans l'axe et concorde avec le tableau
  const valeurs = { id: 'valeurs', afterDatasetsDraw(ch) {
    const sfx = ch.options.suffixe; if (!sfx) return;
    const c = ch.ctx; c.save(); c.font = '600 12px Inter, sans-serif'; c.fillStyle = '#1F2233'; c.textBaseline = 'middle';
    ch.getDatasetMeta(0).data.forEach((b, i) => {
      const t = String(ch.data.datasets[0].data[i]).replace('.', ',') + sfx, w = c.measureText(t).width;
      const dedans = b.x + w + 8 > ch.chartArea.right;
      c.fillStyle = dedans ? '#fff' : '#1F2233'; c.textAlign = dedans ? 'right' : 'left';
      c.fillText(t, dedans ? b.x - 8 : b.x + 6, b.y);
    }); c.restore(); } };
  const opts = (suffix, max) => ({
    suffixe: suffix, animation: false,
    indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ' ' + String(c.raw).replace('.', ',') + suffix } } },
    scales: { x: { beginAtZero: true, max, grid: { color: '#EEF1F5' }, ticks: { callback: v => v + suffix } }, y: { grid: { display: false }, ticks: { font: { weight: 600 }, color: '#1F2233' } } }
  });
  const parDelai = fins.slice().sort((a, b) => stat[a.id].delai - stat[b.id].delai);
  new Chart(document.getElementById('c-delai'), { type: 'bar', data: { labels: parDelai.map(f => f.court), datasets: [{ data: parDelai.map(f => stat[f.id].delai), backgroundColor: parDelai.map(f => stat[f.id].delai > 10 ? '#B54708' : '#00438D'), borderRadius: 6, barThickness: 18 }] }, options: opts(' j'), plugins: [valeurs] });
  const parTaux = fins.slice().sort((a, b) => stat[b.id].taux - stat[a.id].taux);
  new Chart(document.getElementById('c-accord'), { type: 'bar', data: { labels: parTaux.map(f => f.court), datasets: [{ data: parTaux.map(f => stat[f.id].taux), backgroundColor: parTaux.map(f => stat[f.id].taux < 60 ? '#B42318' : '#067647'), borderRadius: 6, barThickness: 18 }] }, options: opts(' %', 100), plugins: [valeurs] });

  // classement
  const cl = D.financeurs.slice().sort((a, b) => stat[b.id].montant - stat[a.id].montant);
  const maxM = Math.max(...cl.map(f => stat[f.id].montant)) || 1;
  document.getElementById('classement').innerHTML = '<thead><tr><th>Financeur</th><th>Relation</th><th class="num">Dossiers</th><th class="num">En cours</th><th class="num">Accord</th><th class="num">Délai</th><th>Montant accordé</th></tr></thead><tbody>' +
    cl.map(f => { const s = stat[f.id]; return `<tr><td><div class="fin-nom">${mono(f)}${esc(f.court)}</div></td><td><span class="badge ${REL[f.relation]}">${f.relation}</span></td><td class="num">${s.n}</td><td class="num">${s.cours}</td><td class="num">${s.taux === null ? 'n.c.' : s.taux + ' %'}</td><td class="num">${s.delai === null ? 'n.c.' : String(s.delai).replace('.', ',') + ' j'}</td><td><div style="display:flex;gap:10px;align-items:center"><div class="mini-barre" style="flex:1"><i style="width:${100 * s.montant / maxM}%"></i></div><span class="num" style="min-width:90px">${s.montant ? fcfa(s.montant) : 'aucun'}</span></div></td></tr>`; }).join('') + '</tbody>';

  // fiches financeurs
  const types = ['Tous', 'Banque', 'Crédit-bail', 'Location longue durée'];
  let typeSel = 'Tous';
  const ff = document.getElementById('f-type');
  function fiches() {
    ff.innerHTML = types.map(t => `<button class="chip ${t === typeSel ? 'on' : ''}" data-v="${t}">${t}</button>`).join('');
    document.getElementById('fiches').innerHTML = D.financeurs.filter(f => typeSel === 'Tous' || f.type === typeSel).map(f => {
      const s = stat[f.id];
      return `<article class="fiche"><div class="f-tete">${mono(f)}<div><h3>${esc(f.nom)}</h3><span class="note">${esc(f.type)}, ${esc(f.cible)}</span></div></div>
      <div class="f-tags"><span class="badge ${REL[f.relation]}">${f.relation}</span>${f.produits.map(p => `<span class="badge b-gris">${esc(p)}</span>`).join('')}</div>
      <p class="f-lien">${esc(f.lien_byd)}</p>
      <div class="cond"><b>${ico('alerte')}Conditions indicatives, à confirmer</b>${esc(f.conditions)}</div>
      <div class="f-stats"><div class="f-stat"><b>${s.n}</b><span>dossiers</span></div><div class="f-stat"><b>${s.taux === null ? 'n.c.' : s.taux + ' %'}</b><span>accord</span></div><div class="f-stat"><b>${s.delai === null ? 'n.c.' : String(s.delai).replace('.', ',') + ' j'}</b><span>délai moyen</span></div></div>
      <div class="f-contacts">${f.contacts.map(c => `<div class="contact"><span class="av">${ini(c.nom)}</span><div>${esc(c.nom)}<br><small>${esc(c.fonction)}, ${esc(c.tel)}</small></div></div>`).join('')}</div>
      <div class="f-proch">${ico('fleche', '#00438D')}<div><strong>Prochaine action, ${jourL(f.prochaine.date)}</strong><br>${esc(f.prochaine.action)}</div></div>
      <div class="f-src">Sources<ol>${f.sources.map(x => `<li><a href="${x[1]}" target="_blank" rel="noopener">${esc(x[0])}</a></li>`).join('')}</ol></div></article>`;
    }).join('');
  }
  ff.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { typeSel = b.dataset.v; fiches(); } });
  fiches();

  // kanban dossiers
  let finSel = 'tous';
  const fk = document.getElementById('f-fin');
  function kanban() {
    const avec = D.financeurs.filter(f => stat[f.id].n);
    fk.innerHTML = `<button class="chip ${finSel === 'tous' ? 'on' : ''}" data-v="tous">Tous</button>` + avec.map(f => `<button class="chip ${finSel === f.id ? 'on' : ''}" data-v="${f.id}">${esc(f.court)}</button>`).join('');
    const l = dos.filter(d => finSel === 'tous' || d.financeur === finSel);
    document.getElementById('kanban').innerHTML = STATUTS.map(s => {
      const c = l.filter(d => d.statut === s);
      return `<div class="col"><div class="col-tete">${s}<span class="badge ${BADGE[s]}">${c.length}</span></div>${c.map(d => `<div class="carte ${d.retard ? 'retard' : ''}"><div class="c-client">${d.flotte ? ico('banque', '#3E3D5C') : ''}${esc(d.client)}</div>
      <div class="c-det">${d.qte > 1 ? d.qte + ' × ' : ''}${esc(d.modele)}, ${fcfa(d.montant)}</div>
      <div class="c-bas"><span class="badge b-gris">${esc(F[d.financeur].court)}</span><span class="note">${d.retard ? '<strong style="color:#B42318">' + d.attente + ' j sans réponse</strong>' : d.reponse ? 'décision le ' + jour(d.reponse) : 'déposé le ' + jour(d.depot)}</span></div></div>`).join('') || '<p class="vide">Aucun</p>'}</div>`;
    }).join('');
  }
  fk.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { finSel = b.dataset.v; kanban(); } });
  kanban();

  // actions
  document.getElementById('actions').innerHTML = D.financeurs.slice().sort((a, b) => a.prochaine.date.localeCompare(b.prochaine.date)).map(f => {
    const j = Math.round((dte(f.prochaine.date) - AUJ) / 864e5);
    return `<div class="action">${mono(f)}<div><p><strong>${esc(f.court)}</strong> : ${esc(f.prochaine.action)}</p><div class="sous">Contact : ${esc(f.contacts[0].nom)}, ${esc(f.contacts[0].fonction)}</div></div><span class="badge ${j <= 1 ? 'b-rouge' : j <= 3 ? 'b-orange' : 'b-bleu'}">${jourL(f.prochaine.date)}</span></div>`;
  }).join('');

  // fil des échanges
  let echSel = 'tous';
  const fe = document.getElementById('f-ech');
  function fil() {
    fe.innerHTML = `<button class="chip ${echSel === 'tous' ? 'on' : ''}" data-v="tous">Tous</button>` + D.financeurs.map(f => `<button class="chip ${echSel === f.id ? 'on' : ''}" data-v="${f.id}">${esc(f.court)}</button>`).join('');
    const l = D.echanges.filter(e => echSel === 'tous' || e.financeur === echSel);
    document.getElementById('nb-echanges').textContent = l.length + ' échanges sur les huit dernières semaines';
    document.getElementById('fil').innerHTML = l.map(e => `<li><span class="rond">${ico(CANAL[e.canal])}</span><div><p><strong>${esc(F[e.financeur].court)}</strong> : ${esc(e.sujet)}</p><div class="sous">${e.canal}, ${jourL(e.date)}, avec ${esc(e.contact)}, par ${esc(e.par)}</div></div></li>`).join('');
  }
  fe.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { echSel = b.dataset.v; fil(); } });
  fil();

  // newsletter
  const N = D.newsletter, S = N.suivi;
  document.getElementById('nl-titre').textContent = N.titre;
  document.getElementById('nl-date').textContent = 'Envoyée le ' + jourL(N.envoi) + ' à ' + S.length + ' contacts de ' + D.financeurs.length + ' financeurs';
  document.getElementById('nl-lien').href = N.url;
  const ouv = S.filter(s => s.ouverte).length, cli = S.filter(s => s.clics).length, rep = S.filter(s => s.repondu).length;
  const pc = n => Math.round(100 * n / S.length) + ' %';
  document.getElementById('nl-kpis').innerHTML = [['lettre', 'Reçue', S.length, 'contacts'], ['oeil', 'Ouverte', ouv, pc(ouv) + ' des contacts'], ['clic', 'A cliqué', cli, pc(cli) + ' des contacts'], ['rep', 'A répondu', rep, pc(rep) + ' des contacts']]
    .map((k, i) => `<div class="kpi ${i === 3 ? 'noir' : ''}"><div class="k-lib">${ico(k[0])}${k[1]}</div><div class="k-val">${k[2]}</div><div class="k-ref">${k[3]}</div></div>`).join('');
  const nf = D.financeurs.map(f => { const l = S.filter(s => s.financeur === f.id); return { f, r: l.length, o: l.filter(s => s.ouverte).length }; });
  new Chart(document.getElementById('c-nl'), {
    type: 'bar', data: { labels: nf.map(x => x.f.court), datasets: [{ label: 'Reçue', data: nf.map(x => x.r), backgroundColor: '#DDE3EC', borderRadius: 5, barThickness: 14 }, { label: 'Ouverte', data: nf.map(x => x.o), backgroundColor: '#00438D', borderRadius: 5, barThickness: 14 }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } }, scales: { x: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#EEF1F5' } }, y: { grid: { display: false }, ticks: { font: { weight: 600 }, color: '#1F2233' } } } }
  });
  const nonOuv = S.filter(s => !s.ouverte);
  document.getElementById('nl-relance').innerHTML = nonOuv.length ? nonOuv.map(s => `<li><span><strong>${esc(s.contact)}</strong><br><span class="note">${esc(s.fonction)}, ${esc(F[s.financeur].court)}</span></span><span class="faire">${ico('wa')}Relancer</span></li>`).join('') : '<li class="vide">Tout le monde l\'a ouverte.</li>';
  const oui = b => b ? `<span class="ok">${ico('check', '#067647')}</span>` : '<span class="non">non</span>';
  document.getElementById('nl-table').innerHTML = '<thead><tr><th>Contact</th><th>Financeur</th><th class="num">Reçue</th><th class="num">Ouverte</th><th class="num">Clics</th><th class="num">Réponse</th></tr></thead><tbody>' +
    S.map(s => `<tr><td><strong>${esc(s.contact)}</strong><br><span class="note">${esc(s.fonction)}</span></td><td><div class="fin-nom">${mono(F[s.financeur])}${esc(F[s.financeur].court)}</div></td><td class="num">${oui(s.recue)}</td><td class="num">${oui(s.ouverte)}</td><td class="num">${s.clics || '<span class="non">non</span>'}</td><td class="num">${oui(s.repondu)}</td></tr>`).join('') + '</tbody>';

  // onglets
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.toggle('on', x === t));
    document.querySelectorAll('.panneau').forEach(p => p.classList.toggle('on', p.id === 'p-' + t.dataset.t));
    document.getElementById('kpis').style.display = t.dataset.t === 'vue' ? '' : 'none';
    window.dispatchEvent(new Event('resize'));
  }));
  const h = location.hash.slice(1); if (h) { const t = document.querySelector(`.tab[data-t="${h}"]`); if (t) t.click(); }
})();
