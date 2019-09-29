$('#buildingbutton').on('click', function(){
	$('#buildingblocks tr:last').before(`
		<tr>
			<td>
			</td>
		</tr>
	`);
});