NemerleWeb = {
    ToTypedObject: function(obj) {
        if(typeof obj === "string") {
            try {
                obj = JSON.parse(obj);
            } catch(e) {
            }
        }
    
        if(!!obj.$type) {
            //var typename = obj.$type.replace(/.*\+(.+),.+/, "$1");
            var typename = obj.$type.replace(/\./g, "_").replace(/\+/g, "_").replace(/(.+),.+/g, "$1");
            var newObj = eval('new ' + typename + '()');        
            for(var p in obj) {
                if(obj.hasOwnProperty(p) && newObj.hasOwnProperty(p)) {
                    if(typeof newObj[p] === "function")
                        newObj[p](NemerleWeb.ToTypedObject(obj[p]));
                    else 
                        newObj[p] = NemerleWeb.ToTypedObject(obj[p]);
                }
            }
            return newObj;
        }               
        if(obj instanceof Array) {
            var newArr = [];
            for (var i = 0, l = obj.length; i < l; newArr.push(NemerleWeb.ToTypedObject(obj[i++])));
                return newArr;
        }
        return obj;
    },
    GetTemplateName: function (model, viewName) {
        if(!model)
            return "";
    
        return model.constructor.name + "__" + viewName;
    }
}

Array.prototype.getEnumerator = function () {
    this.__enumeratorIndex = -1;
    this.Current = null;
    return this;
}

Array.prototype.dispose = Array.prototype.getEnumerator;

Array.prototype.moveNext = function () {
    if (typeof this.__enumeratorIndex === 'undefined')
        this.__enumeratorIndex = -1;
    this.__enumeratorIndex++;
    this.Current = this[this.__enumeratorIndex];
    return this.__enumeratorIndex < this.length;
}

Array.prototype.current = function () {
    return this[this.__enumeratorIndex];
}

Array.prototype.hd = function () {
    return this[0];
}

Array.prototype.tl = function () {
    return this.splice(1);
}

Array.prototype.Head = Array.propertyIsEnumerable.hd;
Array.prototype.Tail = Array.propertyIsEnumerable.tl;