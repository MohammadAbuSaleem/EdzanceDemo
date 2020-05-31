export function TrustAsResourceUrlFilter ($sce) {
  return function (val) {
        return $sce.trustAsResourceUrl(val);
  }
}