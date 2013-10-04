declare module nweb {
    function invalidate() : void;

    function setCookie(name : string, value : any, days : number) : void ;
    function getCookie<T>(name : string) : T;
    function removeCookie(name : string) : void ;

    module utils {
        function areArraysEqual<TL, TR>(l: Array<TL>, r: Array<TR>): boolean;
        function toTypedObject(obj: any): any;
    }
}
