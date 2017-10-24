function Cut(jsonCut,parentOptimizer,id=0){
	if (jsonCut == null){
		this.l = 0;
		this.packingId = '';
	}
	else{
		this.l = jsonCut.l;
		this.packingId = jsonCut.packingId;
	}
	this.optimizer = parentOptimizer;
	this.id = id;
	this.used = false;
	this.pieces = [];
	this.parents = [];
	this.extra = false;


	this.totalSize = function(){return this.l+this.optimizer.bladeThickness};
	this.setUsed = function(){
		this.used = true;
		this.setUsedParents();
		this.setUsedPieces();
		//this.optimizer.cutCol.setUsedExtraCutsWith(this.pieces)
	}

	this.setUsedParents = function(){
		//SetUsed ExtraCuts that contained this cut
		for(parent of this.parents)
		{
			if(parent.used==false) parent.used = true;
			//if(this.parents[i].used==false) this.parents[i].setUsedPieces();	
		}
	}

	this.setUsedPieces = function(){
		//SetUsed cuts that contain this pieces
		for(piece of this.pieces)
		{
			if(piece.used==false) piece.setUsed();	
		}
	}

	this.getSizeLastPiece= function(){
		var res = this.l;
		if(this.pieces.length>0){
			res = this.pieces[this.pieces.length-1].l;
		}
		return res;
	}

	this.getText = function(){
		var ptxt = '';

		if(this.pieces.length>0){
			for(p of this.pieces){ptxt += p.getText()+' ; '}
				return 'id='+this.id+' l='+this.l+' pieces: '+ptxt;
		}
		else {
			return 'id='+this.id+' l='+this.l;
		}
	}

	this.checkID = function(id){
		var res = true;
		if(this.id==id)
			{res=false}

		for(piece of this.pieces){
			if(piece.id==id){
				res=false};
				if(piece.checkID()==false){res=false}
			}
		return res
	}

	this.findPiece = function(id){
		var res = false;
		for(p of this.pieces){
			if(p.id==id) res = true;
		}

		return res
	}

}


exports.Cut = Cut;