export function classifyFragility({runwayMonths}){
    if(runwayMonths === Infinity) return "stable";
    if(runwayMonths == null) return "breaking";

    if(runwayMonths <= 3 ) return "breaking";
    if(runwayMonths <= 12) return "fragile";

    return "stable";
}