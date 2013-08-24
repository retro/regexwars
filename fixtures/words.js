define(['can/util/string', 'can/util/fixture'], function(can){

  var words = ['a[band]on','ab[and]oned','ab[ili]ty','a[b]le','abo[ut]','a[b]ov[e]','[a]broad','ab[sence]','[ab]sent','ab[solute]','[a]bsolut[e]ly','[abs]orb','[abuse]','a[c]ademi[c]','a[cc]ent','[ac]c[e]ptable','[acc]ept','[acc]ess','acci[dent]','Acc[i]dental','[acc]ommo[da]tion','ac[company]','[acc]ording','ac[count]','[acc]u[rate]','ac[c]use','a[chi]eve','ach[ie]vement','aci[d]','[ack]nowledge','ac[q]ui[r]e','acro[ss]','a[ct]ion','[a]ct[i]v[e]','activ[ity]','[a]ctor','act[ress]','a[ct]ual','actually','ad[ap]t','[add]','a[dd]ition','additio[nal]','[add]ress','[a]deq[uat]e','ad[j]ust','[adm]irat[ion]','[a]dm[i]r[e]','adm[it]','ad[o]pt','adul[t]','a[dv]a[nce]', '[ana]l (as requested by @gperetin)']


  var store = can.fixture.store(words.length - 1, function(i){
    var id = i + 1; // Make ids 1 based instead of 0 based
    return {
      id   : id,
      word : words[i]
    }
  });

  can.fixture({
    'GET /words'         : store.findAll,
    'GET /words/{id}'    : store.findOne,
    'POST /words'        : store.create,
    'PUT /words/{id}'    : store.update,
    'DELETE /words/{id}' : store.destroy
  });

  return store;

})
