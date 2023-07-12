namespace BackupMaker.Api.Abstractions.Common.Assemblers;

public interface IBaseAssembler<TA, TB>
{
	/// <summary>
	///     Convert an object of <typeparamref name="TA" />  to a <typeparamref name="TB" />
	/// </summary>
	TB Convert(TA obj);

	/// <summary>
	///     Convert an object of <typeparamref name="TB" />  to a <typeparamref name="TA" />
	/// </summary>
	TA Convert(TB obj);

	/// <summary>
	///     Convert a list <typeparamref name="TA" />  to a list of <typeparamref name="TB" />
	/// </summary>
	IEnumerable<TB> Convert(IEnumerable<TA> objs);

	/// <summary>
	///     Convert a enumerable of <typeparamref name="TB" />  to a enumerable  of <typeparamref name="TA" />
	/// </summary>
	IEnumerable<TA> Convert(IEnumerable<TB> objs);

	/// <summary>
	///     Convert a list of <typeparamref name="TA" />  to a list  of <typeparamref name="TB" />
	/// </summary>
	List<TB> Convert(List<TA> objs);

	/// <summary>
	///     Convert a list of <typeparamref name="TB" />  to a list of <typeparamref name="TA" />
	/// </summary>
	List<TA> Convert(List<TB> objs);
}