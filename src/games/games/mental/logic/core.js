const self = {
  postMessage : a => {
    console.log('Post message: ', a);
  }
};

/* eslint-disable no-unused-expressions */
!(function (n) {
  let t = {};
  function e(r) {
    if (t[r]) return t[r].exports;
    let u = (t[r] = { i: r, l: false, exports: {} });
    return n[r].call(u.exports, u, u.exports, e), (u.l = true), u.exports;
  }
  (e.m = n),
    (e.c = t),
    (e.d = function (n, t, r) {
      e.o(n, t) || Object.defineProperty(n, t, { enumerable: true, get: r });
    }),
    (e.r = function (n) {
    typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(n, "__esModule", {value: true});
    }),
    (e.t = function (n, t) {
      if ((1 & t && (n = e(n)), 8 & t)) return n;
      if (4 & t && 'object' === typeof n && n && n.__esModule) return n;
      var r = Object.create(null);
      if (
        (e.r(r),
        Object.defineProperty(r, 'default', { enumerable: true, value: n }),
        2 & t && 'string' != typeof n)
      )
        for (var u in n)
          e.d(
            r,
            u,
            ((t) => {
      return n[t];
    }).bind(null, u));
      return r;
    }),
    (e.n = function (n) {
    let t = n && n.__esModule ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return e.d(t, 'a', t), t;
    }),
    (e.o = function (n, t) {
      return Object.prototype.hasOwnProperty.call(n, t);
    }),
    (e.p = '/scripts/'),
    e((e.s = 0));
})([
  function (n, t, e) {
    'use strict';

  let r = function (n) {
      return n && n.__esModule ? n : { default: n };
    })(e(1));
    !(function () {
      var n = 'start',
        t = 'progress',
        e = 'max-attempts',
        u = 'ready';
      (self.terminate = function () {
        console.log('[TERMINATE]');
      }),
        (self.onerror = function () {}),
        (self.onmessage = function (a) {
          var f = a.data;
          if (!r.default.isObject(f) || !f.type)
            throw new Error('Worker message should have a type');
          switch (f.type) {
            case 'generate':
              !(function (a) {
                var f = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                  c = r.default.defaults({}, a, {
                    requiredFormulas: [],
                    allowedFormulas: [],
                    min: 1,
                    max: 999,
                    subtract: true,
                    restriction: false,
                    length: 3,
                    count: 10,
                    optional: 0,
                  }),
                  s = r.default.contains(c.requiredFormulas, 'DC5S'),
                  d = r.default.contains(c.requiredFormulas, 'DC9S');
                (s || d) &&
                  ((a.allowedFormulas = [
                    'LF1',
                    'LF2',
                    'LF4',
                    'LF4',
                    'LF-1',
                    'LF-2',
                    'LF-3',
                    'LF-4',
                  ]),
                  (a.requiredFormulas = []));
                (c.requiredFormulas = r.default.isEmpty(a.requiredFormulas)
                  ? []
                  : p(a.requiredFormulas)),
                  (c.allowedFormulas = r.default.isEmpty(a.allowedFormulas)
                    ? []
                    : p(a.allowedFormulas)),
                  (c.forceRestriction = (function (n) {
                    return Boolean(
                      r.default.intersection(n, [
                        '+1 = +5 -4',
                        '-1 = +4 -5',
                        '+2 = +5 -3',
                        '-2 = +3 -5',
                        '+3 = +5 -2',
                        '-3 = +2 -5',
                        '+4 = +5 -1',
                        '-4 = +1 -5',
                      ]).length,
                    );
                  })(r.default.pluck(c.requiredFormulas, 'name')));
                var h = [],
                  v = 0,
                  m = 2,
                  g = 0;
                console.log(
                  [
                    '-[GENERATE] -------------',
                    '| allowed: ' + r.default.pluck(c.allowedFormulas, 'name'),
                    '| required: ' + r.default.pluck(c.requiredFormulas, 'name'),
                    '| range: ' + c.min + '-' + c.max,
                    '| length: ' + c.length,
                    '| subtract: ' + c.subtract,
                    '-------------------------',
                  ].join('\n'),
                ),
                  self.postMessage({ type: n, options: a });
                var y = function (n, t) {
                  let e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
                  if (!n || !t) return true;
                  let u = r.default.some(n.slice(-2), (n) => {
                      return r.default.isEqual(n.numbers, t.numbers);
                    }),
                    a = 0;
                  return (
                    r.default.forEach(n, (n) => {
                      r.default.isEqual(n.numbers, t.numbers) && a++;
                    }),
                    a < e && !u
                  );
                };
                for (; h.length < c.count; ) {
                  var b = l(c);
                  if ((f && (b = y(h, b, m) ? b : null), r.default.isNull(b) || (s && i(b)))) {
                    if (
                      ++v >= 100 &&
                      ((f && h.length !== g) || self.postMessage({ type: e, data: v, options: a }),
                      (v = 0),
                      m++,
                      (g = h.length),
                      !f || h.length === g)
                    )
                      break;
                  } else self.postMessage({ type: t, data: o(b), options: a }), h.push(b);
                }
                self.postMessage({ type: u, data: r.default.map(h, o), options: a });
              })(f.options || {}, f.isLimit);
          }
        });
      let a = function n(t) {
        return t instanceof n ? t : this instanceof n ? void (this.MAFormulawrapped = t) : new n(t);
      };
      function i(n) {
        return r.default.reduce(
          n.numbers,
          (n, t) => {
            return (
              (n.result =
                n.result ||
                r.default.some([t, n.acc + t], (n) => {
                  return r.default.some(
                    r.default.map(Math.abs(n).toString().split(''), Number),
                    (n) => {
                      return n > 5;
                    },
                  );
                })),
              (n.acc += t),
              n
            );
          },
          { acc: 0, result: false },
        ).result;
      }
      function o(n) {
        return (
          (n.formulas = r.default.map(n.formulas, (n) => {
            return { name: n.name, key: n.key, prefix: n.prefix };
          })),
          n
        );
      }
      function l(n) {
        n = r.default.defaults(n, {
          requiredFormulas: [],
          allowedFormulas: [],
          min: 1,
          max: 999,
          subtract: true,
          restriction: false,
          length: 3,
          count: 10,
          optional: 0,
        });
        for (var t = 0, e = null; r.default.isNull(e) && t < 100; ) (e = f(n)), t++;
        if (r.default.isNull(e)) return null;
      let u = r.default.reduce(e.numbers, (n, t) => {
              return n ? ((n += t > 0 ? ' + ' : ' - '), (n += Math.abs(t))) : (n = t), n;
            },
            '',
          ),
          a = v(e.numbers);
        return {
          text: (u += ' = ' + a),
          formula: r.default.pluck(n.requiredFormulas, 'name').join('+') || 'DC',
          numbers: e.numbers,
          formulas: e.formulas,
          result: a,
        };
      }
      function f(n) {
        if (
          2 *
            (n = r.default.defaults(n, {
              requiredFormulas: [],
              allowedFormulas: [],
              min: 1,
              max: 999,
              subtract: true,
              restriction: false,
              length: 3,
              optional: 0,
            })).requiredFormulas.length >
          n.length
        )
          return null;
        for (
          var t = r.default.pluck(n.requiredFormulas, 'name'), e = 0, u = 0, a = [], i = [];
          a.length < n.length && u < 20;

        ) {
          let o = c(n, v(a));
          r.default.isNull(o) || (a.length > 0 && Math.abs(o.number) === Math.abs(a[a.length - 1]))
            ? ++e > 20 && ((a = []), (i = []), (e = 0), u++)
            : (a.push(o.number), (i = r.default.union(i, o.formulas)));
        }
        if (a.length === 0) return null;
        var l = r.default.pluck(i, 'name');
        return n.requiredFormulas.length > 0 && !r.default.isEmpty(r.default.difference(t, l))
          ? null
          : n.optional + n.requiredFormulas.length > l.length
          ? null
          : { numbers: a, formulas: i };
      }
      function c(n, t) {
        if (
          ((n = r.default.defaults(n, {
            allowedFormulas: [],
            min: 1,
            max: 999,
            subtract: true,
            restriction: false,
          })),
          (t = r.default.isNumber(t) ? t : 0),
          !n.subtract && n.max - t < n.min)
        )
          return null;
        var e = !n.subtract || r.default.sample([true, false]),
          u = (e = e || t < 2 * n.min) ? Math.abs(n.min) : -1 * Math.abs(Math.min(n.max, t)),
          i = e ? Math.abs(n.restriction ? n.max - t : n.max) : -1 * Math.abs(Math.min(n.min, t));
        i = e && n.forceRestriction ? Math.abs(n.max - t) : i;
      let o = r.default.pluck(n.allowedFormulas, "name");
        o.push(a.DIRECT.name);
        var l = r.default.random(u, i),
          f = r.default.sample([1, -1]),
          c = r.default.filter([s(t, u, i, o, l, f), s(t, u, i, o, l, -f)], (n) => {
            return !!n;
          });
        return c.length ? r.default.sample(c) : null;
      }
      function s(n, t, e, u, a, i) {
        for (var o = false; !o && a >= t && a <= e; ) {
          var l = h(n, a),
            f = r.default.pluck(l, 'name');
          r.default.isEmpty(r.default.difference(f, u)) && n + a > 0 && 0 !== a
            ? (o = true)
            : (a += i);
        }
        return o ? { start: n, number: a, formulas: l } : null;
      }
      function p(n) {
        return r.default.map(n, (n) => {
          let t = r.default.isString(n) ? n : n.name;
          return a[t] || r.default.findWhere(r.default.values(a), { name: t });
        });
      }
      function h(n, t) {
        return r.default.filter(r.default.values(a), (e) => {
          return e.willTrigger(n, t);
        });
      }
      function v(n) {
        return r.default.reduce(
          n,
          (n, t) => {
            return n + t;
          },
          0,
        );
      }
      function m(n) {
        return {
          prefix: n,
          name: 'Abstract',
          isPending (n) {
        return !r.default.isEmpty(this.getPending(n));
      }, getPending (n) {
        return [];
      }, subtract: n < 0, getTriggers (t) {
        var e = this.getPending(t);
        return r.default.isEmpty(e) ? [] : r.default.map(e, function (t) {
          return n * Math.pow(10, t);
        });
      }, willTrigger: r.default.memoize(function (n, t) {
              var e = this;
              if (!r.default.isNumber(n) || !r.default.isNumber(t)) return false;
              var u = (function (n) {
                  return r.default.map(
                    r.default.map(Math.abs(n).toString().split(''), Number),
                    (t, e, r) => {
            let u = r.length - 1 - e; var a = 10**u;
                      return n < 0 && (t *= -1), t * a;
                    },
                  );
                })(t),
                a = e.getTriggers(n);
              if (!r.default.isEmpty(r.default.intersection(a, u))) return true;
        let i = r.default.zip(r.default.map(Math.abs(n).toString().split(""), Number).reverse(), r.default.map(Math.abs(n + t).toString().split(""), Number).reverse());
              return r.default.some(i, (n, u, a) => {
                if (
                  (r.default.isUndefined(n[0]) && (n[0] = 0),
                  r.default.isUndefined(n[1]) && (n[1] = 0),
                  n[0] === n[1])
                )
                  return false;
                0 === n[0] && u < a.length - 1 && t < 0 && (n[0] = 10);
                var i = n[1] - n[0];
                return r.default.contains(e.getTriggers(n[0]), i);
              });
            },
            function () {
              return r.default.toArray(arguments).join('_');
            },
          ),
        };
      }
      function y(n) {
        return !n || r.default.isEmpty(n) ? 0 : parseInt(n.join(''));
      }
      (a.DIRECT = (function (n) {
        return r.default.extend({}, m(n), { name: 'Прямой счет', key: 'DIRECT' });
      })()),
        r.default.each(r.default.range(1, 5).concat(r.default.range(-1, -5, -1)), (n) => {
          a['LF' + n] = (function (n) {
            if (Math.abs(n) > 4 || 0 === n)
              throw new Error('LF formula prefix must be from -4 to 4, excluding zero');
            return r.default.extend({}, m(n), {
              name: n > 0 ? '+' + n + ' = +5 -' + (5 - n) : n + ' = +' + (5 + n) + ' -5',
              key: 'LF' + n,
              getPending (t) {
          var e = [];
          if (!r.default.isNumber(t)) return e;
          var u = r.default.map(Math.abs(t).toString().split(""), Number).reverse();
          return r.default.each(u, function (t, r, u) {
            (n > 0 ? t >= 5 - n && t < 5 : t >= 5 && t < 5 + Math.abs(n)) && e.push(r);
          }), e;
        }});
          })(n);
        }),
        r.default.each(r.default.range(1, 10).concat(r.default.range(-1, -10, -1)), (n) => {
          a['BF' + n] = (function (n) {
            if (Math.abs(n) > 9 || 0 === n)
              throw new Error('BF formula prefix must be from -9 to 9, excluding zero');
            return r.default.extend({}, m(n), {
              name: n > 0 ? '+' + n + ' = ' + (n - 10) + ' +10' : n + ' = -10 +' + (10 + n),
              key: 'BF' + n,
              getPending (t) {
          var e = [];
          if (!r.default.isNumber(t)) return e;
          var u = r.default.map(Math.abs(t).toString().split(""), Number).reverse();
          return r.default.each(u, function (t, u, a) {
            var i = false;
            if (n > 0) i = t >= 10 - n; else {
              var o = y(r.default.rest(a, u + 1).reverse());
              i = (i = t < Math.abs(n)) && o > 0, Math.abs(n) > 5 && (i = i && (t < Math.abs(n + 5) || t >= 5));
            }
            i && e.push(u);
          }), e;
        }});
          })(n);
        }),
        r.default.each(r.default.range(6, 10).concat(r.default.range(-6, -10, -1)), (n) => {
          a['FA' + n] = (function (n) {
            if (Math.abs(n) < 6 || Math.abs(n) > 9 || 0 === n)
              throw new Error(
                'FA formula prefix must be from -9 to -6 and from 6 to 9, excluding zero',
              );
            return r.default.extend({}, m(n), {
              name: n > 0 ? '+' + n + ' = +' + (n - 5) + '-5 +10' : n + ' = -10 +5 ' + (n + 5),
              key: 'FA' + n,
              getPending (t) {
          var e = [];
          if (!r.default.isNumber(t)) return e;
          var u = r.default.map(Math.abs(t).toString().split(""), Number).reverse();
          return r.default.each(u, function (t, u, a) {
            var i = y(r.default.rest(a, u + 1).reverse());
            (n > 0 ? t >= 5 && t <= 14 - n : t >= Math.abs(n + 5) && t < 5 && i > 0) && e.push(u);
          }), e;
        }});
          })(n);
        });
    })(self);
  },
  function (n, t, e) {
    (function (n, e) {
      var r;
      !(function () {
        var u =
            ('object' == typeof self && self.self === self && self) ||
            ('object' == typeof n && n.global === n && n) ||
            this ||
            {},
          a = u._,
          i = Array.prototype,
          o = Object.prototype,
          l = 'undefined' != typeof Symbol ? Symbol.prototype : null,
          f = i.push,
          c = i.slice,
          s = o.toString,
          p = o.hasOwnProperty,
          d = Array.isArray,
          h = Object.keys,
          v = Object.create,
          m = function () {},
          g = function (n) {
            return n instanceof g ? n : this instanceof g ? void (this._wrapped = n) : new g(n);
          };
        void 0 === t || t.nodeType
          ? (u._ = g)
          : (void 0 !== e && !e.nodeType && e.exports && (t = e.exports = g), (t._ = g)),
          (g.VERSION = '1.9.1');
        var y,
          b = function (n, t, e) {
            if (void 0 === t) return n;
            switch (e == null ? 3 : e) {
              case 1:
                return function (e) {
                  return n.call(t, e);
                };
              case 3:
                return function (e, r, u) {
                  return n.call(t, e, r, u);
                };
              case 4:
                return function (e, r, u, a) {
                  return n.call(t, e, r, u, a);
                };
            }
            return function () {
              return n.apply(t, arguments);
            };
          },
          x = function (n, t, e) {
            return g.iteratee !== y
              ? g.iteratee(n, t)
              : null == n
              ? g.identity
              : g.isFunction(n)
              ? b(n, t, e)
              : g.isObject(n) && !g.isArray(n)
              ? g.matcher(n)
              : g.property(n);
          };
        g.iteratee = y = function (n, t) {
          return x(n, t, Infinity);
        };
        let w = function (n, t) {
            return (
              (t = null == t ? n.length - 1 : +t),
              function () {
                for (var e = Math.max(arguments.length - t, 0), r = Array(e), u = 0; u < e; u++)
                  r[u] = arguments[u + t];
                switch (t) {
                  case 0:
                    return n.call(this, r);
                  case 1:
                    return n.call(this, arguments[0], r);
                  case 2:
                    return n.call(this, arguments[0], arguments[1], r);
                }
                let a = Array(t + 1);
                for (u = 0; u < t; u++) a[u] = arguments[u];
                return (a[t] = r), n.apply(this, a);
              }
            );
          },
          F = function (n) {
            if (!g.isObject(n)) return {};
            if (v) return v(n);
            m.prototype = n;
        let t = new m;
            return (m.prototype = null), t;
          },
          j = function (n) {
            return function (t) {
              return t == null ? void 0 : t[n];
            };
          },
          _ = function (n, t) {
            for (var e = t.length, r = 0; r < e; r++) {
              if (n == null) return;
              n = n[t[r]];
            }
            return e ? n : void 0;
          },
          k = Math.pow(2, 53) - 1,
          A = j('length'),
          O = function (n) {
            var t = A(n);
            return 'number' === typeof t && t >= 0 && t <= k;
          };
        (g.each = g.forEach =
          function (n, t, e) {
            var r; var u;
            if (((t = b(t, e)), O(n))) for (r = 0, u = n.length; r < u; r++) t(n[r], r, n);
            else {
              let a = g.keys(n);
              for (r = 0, u = a.length; r < u; r++) t(n[a[r]], a[r], n);
            }
            return n;
          }),
          (g.map = g.collect =
            function (n, t, e) {
              t = x(t, e);
              for (
                var r = !O(n) && g.keys(n), u = (r || n).length, a = Array(u), i = 0;
                i < u;
                i++
              ) {
                let o = r ? r[i] : i;
                a[i] = t(n[o], o, n);
              }
              return a;
            });
        let E = function (n) {
          return function (t, e, r, u) {
            var a = arguments.length >= 3;
            return (function (t, e, r, u) {
              var a = !O(t) && g.keys(t),
                i = (a || t).length,
                o = n > 0 ? 0 : i - 1;
              for (u || ((r = t[a ? a[o] : o]), (o += n)); o >= 0 && o < i; o += n) {
                var l = a ? a[o] : o;
                r = e(r, t[l], l, t);
              }
              return r;
            })(t, b(e, u, 4), r, a);
          };
        };
        (g.reduce = g.foldl = g.inject = E(1)),
          (g.reduceRight = g.foldr = E(-1)),
          (g.find = g.detect =
            function (n, t, e) {
              let r = (O(n) ? g.findIndex : g.findKey)(n, t, e);
              if (void 0 !== r && r !== -1) return n[r];
            }),
          (g.filter = g.select =
            function (n, t, e) {
              var r = [];
              return (
                (t = x(t, e)),
                g.each(n, (n, e, u) => {
                  t(n, e, u) && r.push(n);
                }),
                r
              );
            }),
          (g.reject = function (n, t, e) {
            return g.filter(n, g.negate(x(t)), e);
          }),
          (g.every = g.all =
            function (n, t, e) {
              t = x(t, e);
              for (let r = !O(n) && g.keys(n), u = (r || n).length, a = 0; a < u; a++) {
                var i = r ? r[a] : a;
                if (!t(n[i], i, n)) return false;
              }
              return true;
            }),
          (g.some = g.any =
            function (n, t, e) {
              t = x(t, e);
              for (let r = !O(n) && g.keys(n), u = (r || n).length, a = 0; a < u; a++) {
                var i = r ? r[a] : a;
                if (t(n[i], i, n)) return true;
              }
              return false;
            }),
          (g.contains =
            g.includes =
            g.include =
              function (n, t, e, r) {
                return (
                  O(n) || (n = g.values(n)),
                  ('number' != typeof e || r) && (e = 0),
                  g.indexOf(n, t, e) >= 0
                );
              }),
          (g.invoke = w((n, t, e) => {
            var r; var u;
            return (
              g.isFunction(t)
                ? (u = t)
                : g.isArray(t) && ((r = t.slice(0, -1)), (t = t[t.length - 1])),
              g.map(n, (n) => {
                var a = u;
                if (!a) {
                  if ((r && r.length && (n = _(n, r)), null == n)) return;
                  a = n[t];
                }
                return a == null ? a : a.apply(n, e);
              })
            );
          })),
          (g.pluck = function (n, t) {
            return g.map(n, g.property(t));
          }),
          (g.where = function (n, t) {
            return g.filter(n, g.matcher(t));
          }),
          (g.findWhere = function (n, t) {
            return g.find(n, g.matcher(t));
          }),
          (g.max = function (n, t, e) {
        let r; var u; var a = -Infinity; var i = -Infinity;
            if (null == t || ('number' == typeof t && 'object' != typeof n[0] && null != n))
              for (var o = 0, l = (n = O(n) ? n : g.values(n)).length; o < l; o++)
                null != (r = n[o]) && r > a && (a = r);
            else
              (t = x(t, e)),
                g.each(n, (n, e, r) => {
                  ((u = t(n, e, r)) > i || (u === -Infinity && a === -Infinity)) &&
                    ((a = n), (i = u));
                });
            return a;
          }),
          (g.min = function (n, t, e) {
        let r; var u; var a = Infinity; var i = Infinity;
            if (null == t || ('number' == typeof t && 'object' != typeof n[0] && null != n))
              for (var o = 0, l = (n = O(n) ? n : g.values(n)).length; o < l; o++)
                null != (r = n[o]) && r < a && (a = r);
            else
              (t = x(t, e)),
                g.each(n, (n, e, r) => {
                  ((u = t(n, e, r)) < i || (u === Infinity && a === Infinity)) &&
                    ((a = n), (i = u));
                });
            return a;
          }),
          (g.shuffle = function (n) {
            return g.sample(n, Infinity);
          }),
          (g.sample = function (n, t, e) {
            if (t == null || e) return O(n) || (n = g.values(n)), n[g.random(n.length - 1)];
        let r = O(n) ? g.clone(n) : g.values(n); var u = A(r);
            t = Math.max(Math.min(t, u), 0);
            for (let a = u - 1, i = 0; i < t; i++) {
          let o = g.random(i, a); var l = r[i];
              (r[i] = r[o]), (r[o] = l);
            }
            return r.slice(0, t);
          }),
          (g.sortBy = function (n, t, e) {
            let r = 0;
            return (
              (t = x(t, e)),
              g.pluck(
                g
                  .map(n, (n, e, u) => {
                    return { value: n, index: r++, criteria: t(n, e, u) };
                  })
                  .sort((n, t) => {
          let e = n.criteria; var r = t.criteria;
                    if (e !== r) {
                      if (e > r || void 0 === e) return 1;
                      if (e < r || void 0 === r) return -1;
                    }
                    return n.index - t.index;
                  }),
                'value',
              )
            );
          });
        let S = function (n, t) {
          return function (e, r, u) {
            let a = t ? [[], []] : {};
            return (
              (r = x(r, u)),
              g.each(e, (t, u) => {
                var i = r(t, u, e);
                n(a, t, i);
              }),
              a
            );
          };
        };
        (g.groupBy = S((n, t, e) => {
          null != n && p.call(n, e) ? n[e].push(t) : (n[e] = [t]);
        })),
          (g.indexBy = S((n, t, e) => {
            n[e] = t;
          })),
          (g.countBy = S((n, t, e) => {
            null != n && p.call(n, e) ? n[e]++ : (n[e] = 1);
          }));
        let N = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        (g.toArray = function (n) {
          return n
            ? g.isArray(n)
              ? c.call(n)
              : g.isString(n)
              ? n.match(N)
              : O(n)
              ? g.map(n, g.identity)
              : g.values(n)
            : [];
        }),
          (g.size = function (n) {
            return n == null ? 0 : O(n) ? n.length : g.keys(n).length;
          }),
          (g.partition = S((n, t, e) => {
            n[e ? 0 : 1].push(t);
          }, true)),
          (g.first =
            g.head =
            g.take =
              function (n, t, e) {
                return null == n || n.length < 1
                  ? null == t
                    ? void 0
                    : []
                  : null == t || e
                  ? n[0]
                  : g.initial(n, n.length - t);
              }),
          (g.initial = function (n, t, e) {
            return c.call(n, 0, Math.max(0, n.length - (t == null || e ? 1 : t)));
          }),
          (g.last = function (n, t, e) {
            return null == n || n.length < 1
              ? null == t
                ? void 0
                : []
              : null == t || e
              ? n[n.length - 1]
              : g.rest(n, Math.max(0, n.length - t));
          }),
          (g.rest =
            g.tail =
            g.drop =
              function (n, t, e) {
                return c.call(n, t == null || e ? 1 : t);
              }),
          (g.compact = function (n) {
            return g.filter(n, Boolean);
          });
        var q = function (n, t, e, r) {
          for (let u = (r = r || []).length, a = 0, i = A(n); a < i; a++) {
            var o = n[a];
            if (O(o) && (g.isArray(o) || g.isArguments(o)))
              if (t) for (var l = 0, f = o.length; l < f; ) r[u++] = o[l++];
              else q(o, t, e, r), (u = r.length);
            else e || (r[u++] = o);
          }
          return r;
        };
        (g.flatten = function (n, t) {
          return q(n, t, false);
        }),
          (g.without = w((n, t) => {
            return g.difference(n, t);
          })),
          (g.uniq = g.unique =
            function (n, t, e, r) {
              g.isBoolean(t) || ((r = e), (e = t), (t = false)), e != null && (e = x(e, r));
              for (var u = [], a = [], i = 0, o = A(n); i < o; i++) {
                var l = n[i],
                  f = e ? e(l, i, n) : l;
                t && !e
                  ? ((i && a === f) || u.push(l), (a = f))
                  : e
                  ? g.contains(a, f) || (a.push(f), u.push(l))
                  : g.contains(u, l) || u.push(l);
              }
              return u;
            }),
          (g.union = w((n) => {
            return g.uniq(q(n, true, true));
          })),
          (g.intersection = function (n) {
            for (var t = [], e = arguments.length, r = 0, u = A(n); r < u; r++) {
              var a = n[r];
              if (!g.contains(t, a)) {
                var i;
                for (i = 1; i < e && g.contains(arguments[i], a); i++);
                i === e && t.push(a);
              }
            }
            return t;
          }),
          (g.difference = w((n, t) => {
            return (
              (t = q(t, true, true)),
              g.filter(n, (n) => {
                return !g.contains(t, n);
              })
            );
          })),
          (g.unzip = function (n) {
            for (var t = (n && g.max(n, A).length) || 0, e = Array(t), r = 0; r < t; r++)
              e[r] = g.pluck(n, r);
            return e;
          }),
          (g.zip = w(g.unzip)),
          (g.object = function (n, t) {
            for (var e = {}, r = 0, u = A(n); r < u; r++)
              t ? (e[n[r]] = t[r]) : (e[n[r][0]] = n[r][1]);
            return e;
          });
        let T = function (n) {
          return function (t, e, r) {
            e = x(e, r);
            for (var u = A(t), a = n > 0 ? 0 : u - 1; a >= 0 && a < u; a += n)
              if (e(t[a], a, t)) return a;
            return -1;
          };
        };
        (g.findIndex = T(1)),
          (g.findLastIndex = T(-1)),
          (g.sortedIndex = function (n, t, e, r) {
            for (var u = (e = x(e, r, 1))(t), a = 0, i = A(n); a < i; ) {
              let o = Math.floor((a + i) / 2);
              e(n[o]) < u ? (a = o + 1) : (i = o);
            }
            return a;
          });
        var P = function (n, t, e) {
          return function (r, u, a) {
          let i = 0; var o = A(r);
            if ('number' == typeof a)
              n > 0
                ? (i = a >= 0 ? a : Math.max(a + o, i))
                : (o = a >= 0 ? Math.min(a + 1, o) : a + o + 1);
            else if (e && a && o) return r[(a = e(r, u))] === u ? a : -1;
            if (u != u) return (a = t(c.call(r, i, o), g.isNaN)) >= 0 ? a + i : -1;
            for (a = n > 0 ? i : o - 1; a >= 0 && a < o; a += n) if (r[a] === u) return a;
            return -1;
          };
        };
        (g.indexOf = P(1, g.findIndex, g.sortedIndex)),
          (g.lastIndexOf = P(-1, g.findLastIndex)),
          (g.range = function (n, t, e) {
            null == t && ((t = n || 0), (n = 0)), e || (e = t < n ? -1 : 1);
            for (
              var r = Math.max(Math.ceil((t - n) / e), 0), u = Array(r), a = 0;
              a < r;
              a++, n += e
            )
              u[a] = n;
            return u;
          }),
          (g.chunk = function (n, t) {
            if (t == null || t < 1) return [];
            for (var e = [], r = 0, u = n.length; r < u; ) e.push(c.call(n, r, (r += t)));
            return e;
          });
        let I = function (n, t, e, r, u) {
          if (!(r instanceof t)) return n.apply(e, u);
          var a = F(n.prototype),
            i = n.apply(a, u);
          return g.isObject(i) ? i : a;
        };
        (g.bind = w((n, t, e) => {
          if (!g.isFunction(n)) throw new TypeError('Bind must be called on a function');
          var r = w(function (u) {
            return I(n, r, t, this, e.concat(u));
          });
          return r;
        })),
          (g.partial = w((n, t) => {
            var e = g.partial.placeholder,
              r = function () {
                for (var u = 0, a = t.length, i = Array(a), o = 0; o < a; o++)
                  i[o] = t[o] === e ? arguments[u++] : t[o];
                for (; u < arguments.length; ) i.push(arguments[u++]);
                return I(n, r, this, this, i);
              };
            return r;
          })),
          (g.partial.placeholder = g),
          (g.bindAll = w((n, t) => {
            let e = (t = q(t, false, false)).length;
            if (e < 1) throw new Error('bindAll must be passed function names');
            for (; e--; ) {
              let r = t[e];
              n[r] = g.bind(n[r], n);
            }
          })),
          (g.memoize = function (n, t) {
            var e = function (r) {
          let u = e.cache; var a = `${  t ? t.apply(this, arguments) : r}`;
              return (null != u && p.call(u, a)) || (u[a] = n.apply(this, arguments)), u[a];
            };
            return (e.cache = {}), e;
          }),
          (g.delay = w((n, t, e) => {
            return setTimeout(() => {
              return n.apply(null, e);
            }, t);
          })),
          (g.defer = g.partial(g.delay, g, 1)),
          (g.throttle = function (n, t, e) {
        let r; var u; var a; var i; var o = 0;
            e || (e = {});
            let l = function () {
                (o = false === e.leading ? 0 : g.now()),
                  (r = null),
                  (i = n.apply(u, a)),
                  r || (u = a = null);
              },
              f = function () {
                let f = g.now();
                o || e.leading !== false || (o = f);
                var c = t - (f - o);
                return (
                  (u = this),
                  (a = arguments),
                  c <= 0 || c > t
                    ? (r && (clearTimeout(r), (r = null)),
                      (o = f),
                      (i = n.apply(u, a)),
                      r || (u = a = null))
                    : r || false === e.trailing || (r = setTimeout(l, c)),
                  i
                );
              };
            return (
              (f.cancel = function () {
                clearTimeout(r), (o = 0), (r = u = a = null);
              }),
              f
            );
          }),
          (g.debounce = function (n, t, e) {
        let r; var u; var a = function (t, e) {
          r = null, e && (u = n.apply(t, e));
        }; var i = w(function (i) {
                if ((r && clearTimeout(r), e)) {
                  let o = !r;
                  (r = setTimeout(a, t)), o && (u = n.apply(this, i));
                } else r = g.delay(a, t, this, i);
                return u;
              });
            return (
              (i.cancel = function () {
                clearTimeout(r), (r = null);
              }),
              i
            );
          }),
          (g.wrap = function (n, t) {
            return g.partial(t, n);
          }),
          (g.negate = function (n) {
            return function () {
              return !n.apply(this, arguments);
            };
          }),
          (g.compose = function () {
        let n = arguments; var t = n.length - 1;
            return function () {
              for (var e = t, r = n[t].apply(this, arguments); e--; ) r = n[e].call(this, r);
              return r;
            };
          }),
          (g.after = function (n, t) {
            return function () {
              if (--n < 1) return t.apply(this, arguments);
            };
          }),
          (g.before = function (n, t) {
            var e;
            return function () {
              return --n > 0 && (e = t.apply(this, arguments)), n <= 1 && (t = null), e;
            };
          }),
          (g.once = g.partial(g.before, 2)),
          (g.restArguments = w);
        var L = !{ toString: null }.propertyIsEnumerable('toString'),
          B = [
            'valueOf',
            'isPrototypeOf',
            'toString',
            'propertyIsEnumerable',
            'hasOwnProperty',
            'toLocaleString',
          ],
          R = function (n, t) {
        let e = B.length; var r = n.constructor; var u = g.isFunction(r) && r.prototype || o; var a = "constructor";
            for (null != n && p.call(n, a) && !g.contains(t, a) && t.push(a); e--; )
              (a = B[e]) in n && n[a] !== u[a] && !g.contains(t, a) && t.push(a);
          };
        (g.keys = function (n) {
          if (!g.isObject(n)) return [];
          if (h) return h(n);
          var t = [];
          for (let e in n) n != null && p.call(n, e) && t.push(e);
          return L && R(n, t), t;
        }),
          (g.allKeys = function (n) {
            if (!g.isObject(n)) return [];
            let t = [];
            for (let e in n) t.push(e);
            return L && R(n, t), t;
          }),
          (g.values = function (n) {
            for (var t = g.keys(n), e = t.length, r = Array(e), u = 0; u < e; u++) r[u] = n[t[u]];
            return r;
          }),
          (g.mapObject = function (n, t, e) {
            t = x(t, e);
            for (var r = g.keys(n), u = r.length, a = {}, i = 0; i < u; i++) {
              var o = r[i];
              a[o] = t(n[o], o, n);
            }
            return a;
          }),
          (g.pairs = function (n) {
            for (var t = g.keys(n), e = t.length, r = Array(e), u = 0; u < e; u++)
              r[u] = [t[u], n[t[u]]];
            return r;
          }),
          (g.invert = function (n) {
            for (var t = {}, e = g.keys(n), r = 0, u = e.length; r < u; r++) t[n[e[r]]] = e[r];
            return t;
          }),
          (g.functions = g.methods =
            function (n) {
              var t = [];
              for (let e in n) g.isFunction(n[e]) && t.push(e);
              return t.sort();
            });
        let z = function (n, t) {
          return function (e) {
            let r = arguments.length;
            if ((t && (e = Object(e)), r < 2 || null == e)) return e;
            for (var u = 1; u < r; u++)
              for (let a = arguments[u], i = n(a), o = i.length, l = 0; l < o; l++) {
                var f = i[l];
                (t && void 0 !== e[f]) || (e[f] = a[f]);
              }
            return e;
          };
        };
        (g.extend = z(g.allKeys)),
          (g.extendOwn = g.assign = z(g.keys)),
          (g.findKey = function (n, t, e) {
            t = x(t, e);
            for (var r, u = g.keys(n), a = 0, i = u.length; a < i; a++)
              if (t(n[(r = u[a])], r, n)) return r;
          });
        let D; var C;
        (g.pick = w((n, t) => {
        let e = {}; var r = t[0];
          if (n == null) return e;
          /* eslint-disable no-undef */
          g.isFunction(r)
            ? (t.length > 1 && (r = b(r, t[1])), (t = g.allKeys(n)))
            : ((r = K), (t = q(t, false, false)), (n = Object(n)));
          for (let u = 0, a = t.length; u < a; u++) {
          let i = t[u]; var o = n[i];
            r(o, i, n) && (e[i] = o);
          }
          return e;
        })),
          (g.omit = w((n, t) => {
        let e; var r = t[0];
            return (
              g.isFunction(r)
                ? ((r = g.negate(r)), t.length > 1 && (e = t[1]))
                : ((t = g.map(q(t, false, false), String)),
                  (r = function (n, e) {
                    return !g.contains(t, e);
                  })),
              g.pick(n, r, e)
            );
          })),
          (g.defaults = z(g.allKeys, true)),
          (g.create = function (n, t) {
            var e = F(n);
            return t && g.extendOwn(e, t), e;
          }),
          (g.clone = function (n) {
            return g.isObject(n) ? (g.isArray(n) ? n.slice() : g.extend({}, n)) : n;
          }),
          (g.tap = function (n, t) {
            return t(n), n;
          }),
          (g.isMatch = function (n, t) {
            var e = g.keys(t),
              r = e.length;
            if (n == null) return !r;
            for (let u = Object(n), a = 0; a < r; a++) {
              var i = e[a];
              if (t[i] !== u[i] || !(i in u)) return false;
            }
            return true;
          }),
          (D = function (n, t, e, r) {
            if (n === t) return n !== 0 || 1 / n == 1 / t;
            if (n == null || t == null) return false;
            if (n != n) return t != t;
            let u = typeof n;
            return ('function' === u || 'object' === u || 'object' === typeof t) && C(n, t, e, r);
          }),
          (C = function (n, t, e, r) {
            n instanceof g && (n = n._wrapped), t instanceof g && (t = t._wrapped);
            var u = s.call(n);
            if (u !== s.call(t)) return false;
            switch (u) {
              case '[object RegExp]':
              case '[object String]':
                return '' + n == '' + t;
              case '[object Number]':
                return +n != +n ? +t != +t : +n == 0 ? 1 / +n == 1 / t : +n == +t;
              case '[object Date]':
              case '[object Boolean]':
                return +n == +t;
              case '[object Symbol]':
                return l.valueOf.call(n) === l.valueOf.call(t);
            }
            var a = '[object Array]' === u;
            if (!a) {
              if ('object' != typeof n || 'object' !== typeof t) return false;
              var i = n.constructor,
                o = t.constructor;
              if (
                i !== o &&
                !(g.isFunction(i) && i instanceof i && g.isFunction(o) && o instanceof o) &&
                'constructor' in n &&
                'constructor' in t
              )
                return false;
            }
            (e = e || []), (r = r || []);
            for (var f = e.length; f--; ) if (e[f] === n) return r[f] === t;
            if ((e.push(n), r.push(t), a)) {
              if ((f = n.length) !== t.length) return false;
              for (; f--; ) if (!D(n[f], t[f], e, r)) return false;
            } else {
          let c; var p = g.keys(n);
              if (((f = p.length), g.keys(t).length !== f)) return false;
              for (; f--; )
                if (((c = p[f]), !(null != t && p.call(t, c)) || !D(n[c], t[c], e, r)))
                  return false;
            }
            return e.pop(), r.pop(), true;
          }),
          (g.isEqual = function (n, t) {
            return D(n, t);
          }),
          (g.isEmpty = function (n) {
            return (
              null == n ||
              (O(n) && (g.isArray(n) || g.isString(n) || g.isArguments(n))
                ? 0 === n.length
                : 0 === g.keys(n).length)
            );
          }),
          (g.isElement = function (n) {
            return !(!n || n.nodeType !== 1);
          }),
          (g.isArray =
            d ||
            function (n) {
              return '[object Array]' === s.call(n);
            }),
          (g.isObject = function (n) {
            var t = typeof n;
            return 'function' === t || ('object' === t && !!n);
          }),
          g.each(
            [
              'Arguments',
              'Function',
              'String',
              'Number',
              'Date',
              'RegExp',
              'Error',
              'Symbol',
              'Map',
              'WeakMap',
              'Set',
              'WeakSet',
            ],
            (n) => {
              g['is' + n] = function (t) {
                return s.call(t) === '[object ' + n + ']';
              };
            },
          ),
          g.isArguments(arguments) ||
            (g.isArguments = function (n) {
              return null != n && p.call(n, 'callee');
            });
        let W = u.document && u.document.childNodes;
      typeof /./ != "function" && typeof Int8Array != "object" && typeof W != "function" && (g.isFunction = function (n) {
            return 'function' === typeof n || false;
          }),
          (g.isFinite = function (n) {
            return !g.isSymbol(n) && isFinite(n) && !isNaN(parseFloat(n));
          }),
          (g.isNaN = function (n) {
            return g.isNumber(n) && isNaN(n);
          }),
          (g.isBoolean = function (n) {
            return true === n || false === n || '[object Boolean]' === s.call(n);
          }),
          (g.isNull = function (n) {
            return n === null;
          }),
          (g.isUndefined = function (n) {
            return void 0 === n;
          }),
          (g.has = function (n, t) {
            if (!g.isArray(t)) return n != null && p.call(n, t);
            for (var e = t.length, r = 0; r < e; r++) {
              var u = t[r];
              if (n == null || !p.call(n, u)) return false;
              n = n[u];
            }
            return !!e;
          }),
          (g.noConflict = function () {
            return (u._ = a), this;
          }),
          (g.identity = function (n) {
            return n;
          }),
          (g.constant = function (n) {
            return function () {
              return n;
            };
          }),
          (g.noop = function () {}),
          (g.property = function (n) {
            return g.isArray(n)
              ? function (t) {
                  return _(t, n);
                }
              : j(n);
          }),
          (g.propertyOf = function (n) {
            return null == n
              ? function () {}
              : function (t) {
                  return g.isArray(t) ? _(n, t) : n[t];
                };
          }),
          (g.matcher = g.matches =
            function (n) {
              return (
                (n = g.extendOwn({}, n)),
                function (t) {
                  return g.isMatch(t, n);
                }
              );
            }),
          (g.times = function (n, t, e) {
            let r = Array(Math.max(0, n));
            t = b(t, e, 1);
            for (let u = 0; u < n; u++) r[u] = t(u);
            return r;
          }),
          (g.random = function (n, t) {
            return null == t && ((t = n), (n = 0)), n + Math.floor(Math.random() * (t - n + 1));
          }),
          (g.now =
            Date.now ||
            function () {
              return new Date().getTime();
            });
        var U = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;',
          },
          G = g.invert(U),
          J = function (n) {
            var e = '(?:' + g.keys(n).join('|') + ')',
              r = RegExp(e),
              u = RegExp(e, 'g');
            return function (n) {
              return (n = null == n ? '' : '' + n), r.test(n) ? n.replace(u, t) : n;
            };
          };
        (g.escape = J(U)),
          (g.unescape = J(G)),
          (g.result = function (n, t, e) {
            g.isArray(t) || (t = [t]);
            var r = t.length;
            if (!r) return g.isFunction(e) ? e.call(n) : e;
            for (let u = 0; u < r; u++) {
              let a = n == null ? void 0 : n[t[u]];
              void 0 === a && ((a = e), (u = r)), (n = g.isFunction(a) ? a.call(n) : a);
            }
            return n;
          });
        let V = 0;
        (g.uniqueId = function (n) {
          var t = ++V + '';
          return n ? n + t : t;
        }),
          (g.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g,
          });
        var $ = /(.)^/,
          H = { "'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\u2028': 'u2028', '\u2029': 'u2029' },
          Q = /\\|'|\r|\n|\u2028|\u2029/g;
        (g.template = function (n, t, e) {
          !t && e && (t = e), (t = g.defaults({}, t, g.templateSettings));
          var r,
            u = RegExp(
              [(t.escape || $).source, (t.interpolate || $).source, (t.evaluate || $).source].join(
                '|',
              ) + '|$',
              'g',
            ),
            a = 0,
            i = "__p+='";
          n.replace(u, (t, e, r, u, o) => {
            return (
              (i += n.slice(a, o).replace(Q, X)),
              (a = o + t.length),
              e
                ? (i += "'+\n((__t=(" + e + "))==null?'':_.escape(__t))+\n'")
                : r
                ? (i += "'+\n((__t=(" + r + "))==null?'':__t)+\n'")
                : u && (i += "';\n" + u + "\n__p+='"),
              t
            );
          }),
            (i += "';\n"),
            t.variable || (i = 'with(obj||{}){\n' + i + '}\n'),
            (i =
              "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
              i +
              'return __p;\n');
          try {
            r = new Function(t.variable || 'obj', '_', i);
          } catch (n) {
            throw ((n.source = i), n);
          }
          var l = t.variable || 'obj';
          return (o.source = 'function(' + l + '){\n' + i + '}'), o;
        }),
          (g.chain = function (n) {
            var t = g(n);
            return (t._chain = true), t;
          });
        var Y = function (n, t) {
          return n._chain ? g(t).chain() : t;
        };
        (g.mixin = function (n) {
          return (
            g.each(g.functions(n), (t) => {
              var e = (g[t] = n[t]);
              g.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments), Y(this, e.apply(g, n));
              };
            }),
            g
          );
        }),
          g.mixin(g),
          g.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], (n) => {
            var t = i[n];
            g.prototype[n] = function () {
              var e = this._wrapped;
              return (
                t.apply(e, arguments),
                ('shift' !== n && 'splice' !== n) || 0 !== e.length || delete e[0],
                Y(this, e)
              );
            };
          }),
          g.each(['concat', 'join', 'slice'], (n) => {
            var t = i[n];
            g.prototype[n] = function () {
              return Y(this, t.apply(this._wrapped, arguments));
            };
          }),
          (g.prototype.value = function () {
            return this._wrapped;
          }),
          (g.prototype.valueOf = g.prototype.toJSON = g.prototype.value),
          (g.prototype.toString = function () {
            return String(this._wrapped);
          }),
          void 0 ===
            (r = function () {
              return g;
            }.apply(t, [])) || (e.exports = r);
      })();
    }.call(this, e(2), e(3)(n)));
  },
  function (n, t) {
    var e;
    e = (function () {
      return this;
    })();
    try {
      e = e || Function('return this')() || (0, eval)('this');
    } catch (n) {
      'object' === typeof window && (e = window);
    }
    n.exports = e;
  },
  function (n, t) {
    n.exports = function (n) {
      return (
        n.webpackPolyfill ||
          ((n.deprecate = function () {}),
          (n.paths = []),
          n.children || (n.children = []),
          Object.defineProperty(n, 'loaded', {
            enumerable: true,
            get () {
      return n.l;
    }}), Object.defineProperty(n, "id", {enumerable: true, get () {
      return n.i;
    }}), n.webpackPolyfill = 1), n;
    };
  },
]);

export default self;
